import { createTRPCRouter } from "@/server/api/trpc"
import { roomList } from './routers/roomList'
import { feedback } from './routers/feedback'



/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({

  roomList: roomList,
  feedback: feedback

})

// export type definition of API
export type AppRouter = typeof appRouter
