import { z } from "zod"

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc"
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

const defaultRoomListSelect = Prisma.validator<Prisma.RoomListSelect>()({
    id: true,
    username: true,
    title: true,
    description: true,
    roomUrl: true,
    userId: true,
})

export const roomList = createTRPCRouter({
    list: privateProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
            })
        )
        .query(async ({ input, ctx }) => {
            const limit = input.limit ?? 50
            const { cursor } = input
            const currentUserId = ctx.currentUserId

            const rooms = await ctx.prisma.roomList.findMany({
                select: defaultRoomListSelect,
                // get an extra item at the end which we'll use as next cursor
                take: limit + 1,
                where: {
                    userId: currentUserId
                },
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
    byId: privateProcedure
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
    byRoomUrl: privateProcedure
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
    add: privateProcedure
        .input(
            z.object({
                id: z.string().cuid().optional(),
                userId: z.string(),
                title: z.string().min(1).max(32),
                description: z.string().min(1),

            })
        )
        .mutation(async ({ input, ctx }) => {
            const currentUserId = ctx.currentUserId
            const roomList = await ctx.prisma.roomList.create({
                data: {
                    userId: currentUserId,
                    title: input.title,
                    description: input.description,


                },


            })
            return roomList
        }),
    delete: privateProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ input, ctx }) => {

            const deleteList = await ctx.prisma.roomList.delete({
                where: {
                    id: input.id,


                },
            })
            return deleteList
        }),
    edit: privateProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().min(1).max(32),
                description: z.string().min(1),
                roomUrl: z.string().optional(),
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
