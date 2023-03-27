import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

const defaultRoomListSelect = Prisma.validator<Prisma.RoomListSelect>()({
    id: true,
    title: true,
    description: true,
    roomUrl: true,
    email: true,
})

export const roomListRouter = createTRPCRouter({
    list: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
            })
        )
        .query(async ({ input, ctx }) => {
            /**
             * For pagination docs you can have a look here
             * @see https://trpc.io/docs/useInfiniteQuery
             * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
             */

            const limit = input.limit ?? 50
            const { cursor } = input

            const rooms = await ctx.prisma.roomList.findMany({
                select: defaultRoomListSelect,
                // get an extra item at the end which we'll use as next cursor
                take: limit + 1,
                where: {},
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
            })
            let nextCursor: typeof cursor | undefined = undefined
            if (rooms.length > limit) {
                // Remove the last item and use it as next cursor

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const nextItem = rooms.pop()!
                nextCursor = nextItem.id
            }

            return {
                items: rooms.reverse(),
                nextCursor,
            }
        }),
    byId: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { id } = input
            const roomList = await ctx.prisma.roomList.findUnique({
                where: {
                    id,
                },
                select: defaultRoomListSelect,
            })
            if (!roomList) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No room with id:'${id}'`,
                })
            }
            return roomList
        }),
    byRoomUrl: publicProcedure
        .input(
            z.object({
                roomUrl: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { roomUrl } = input
            const roomList = await ctx.prisma.roomList.findUnique({
                where: {
                    roomUrl,
                },
                select: defaultRoomListSelect
            })
            if (!roomList) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No room with roomUrl '${roomUrl}'`,
                })
            }
            return roomList
        }),
    add: publicProcedure
        .input(
            z.object({
                id: z.string().cuid().optional(),
                title: z.string().min(1).max(32),
                description: z.string().min(1),
                roomUrl: z.string().cuid().optional(),
                email: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const roomList = await ctx.prisma.roomList.create({
                data: input,
                select: defaultRoomListSelect,
            })
            return roomList
        }),
    delete: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const deleteList = await ctx.prisma.roomList.delete({
                where: {
                    id: input.id,
                },
            })
            return deleteList
        }),
    edit: publicProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().min(1).max(32),
                description: z.string().min(1),
                roomUrl: z.string().optional(),
                email: z.string().optional(),
            })
        ).mutation(async ({ input, ctx }) => {
            const editList = await ctx.prisma.roomList.update({
                where: {
                    id: input.id
                },
                data: input,

            })
            return editList
        })
})
