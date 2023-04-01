import { z } from "zod"
import ip from 'ip'
import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc"
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import { Ratelimit } from "@upstash/ratelimit" // for deno: see above
import { Redis } from "@upstash/redis"



const defaultFeedbacksSelect = Prisma.validator<Prisma.FeedbacksSelect>()({
    id: true,
    title: true,
    description: true,
    roomUrl: true,
    message: true,
    star: true,
    createdAt: true,
    identity: true

})


// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(1, "10 m"),
    analytics: true,
    /**
     * Optional prefix for the keys used in redis. This is useful if you want to share a redis
     * instance with other applications and want to avoid key collisions. The default prefix is
     * "@upstash/ratelimit"
     */
    prefix: "@upstash/ratelimit",
})


export const feedback = createTRPCRouter({
    list: privateProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
                roomUrl: z.string()
            })
        )
        .query(async ({ input, ctx }) => {

            const limit = input.limit ?? 50
            const { cursor } = input

            const feebacks = await ctx.prisma.feedbacks.findMany({
                select: defaultFeedbacksSelect,

                take: limit + 1,
                where: {
                    roomUrl: input.roomUrl
                },
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
            })
            let nextCursor: typeof cursor | undefined = undefined
            if (feebacks.length > limit) {
                // Remove the last item and use it as next cursor

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const nextItem = feebacks.pop()!
                nextCursor = nextItem.id
            }

            return {
                items: feebacks.reverse(),
                nextCursor,
            }
        }),
    byRoomUrl: privateProcedure
        .input(
            z.object({
                roomUrl: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { roomUrl } = input
            const feedback = await ctx.prisma.feedbacks.findMany({
                where: {
                    roomUrl,
                },
                select: defaultFeedbacksSelect,
            })
            if (!feedback) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No room with id:'${roomUrl}'`,
                })
            }
            return feedback
        }),
    add: publicProcedure


        .input(
            z.object({
                id: z.string().cuid().optional(),
                title: z.string(),
                description: z.string(),
                message: z.string(),
                star: z.string(),
                roomUrl: z.string(),
                identity: z.string().optional()

            })
        )
        .mutation(async ({ input, ctx }) => {

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            const { success } = await ratelimit.limit(ip.address())
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const feedback = await ctx.prisma.feedbacks.create({
                data: input
            })
            return feedback
        }),

})
