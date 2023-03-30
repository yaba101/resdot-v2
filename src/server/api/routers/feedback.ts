
import { z } from "zod"

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc"
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

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

export const feedback = createTRPCRouter({
    list: privateProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
                roomUrlId: z.string()
            })
        )
        .query(async ({ input, ctx }) => {

            const limit = input.limit ?? 50
            const { cursor } = input

            const feebacks = await ctx.prisma.feedbacks.findMany({
                select: defaultFeedbacksSelect,

                take: limit + 1,
                where: {
                    roomUrl: input.roomUrlId
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
    byId: privateProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { id } = input
            const feedback = await ctx.prisma.feedbacks.findUnique({
                where: {
                    id,
                },
                select: defaultFeedbacksSelect,
            })
            if (!feedback) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No room with id:'${id}'`,
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
                roomUrlId: z.string(),
                identity: z.string().optional().default('Anonymous')

            })
        )
        .mutation(async ({ input, ctx }) => {
            const feedback = await ctx.prisma.feedbacks.create({
                data: input
            })
            return feedback
        }),

})
