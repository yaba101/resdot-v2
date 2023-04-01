/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { useRouter } from "next/router";
// import NextError from "next/error";
// import Rating from "@/components/Rating";
// import Thanks from "@/components/Thank";
import { api } from "@/utils/api";
import FeedBackReview from "@/components/Review";

// export const FeedbackSchema = z.object({
//   id: z.string().cuid().optional(),
//   title: z.string().min(1).max(32),
//   description: z.string().min(1),
//   message: z.string().min(2).max(300),
//   star: z.string(),
//   roomUrlId: z.string().min(1),
//   identity: z.string().optional().default("Anonymous"),
// });
// type FormData = z.infer<typeof FeedbackSchema>;

const FeedbackPage = () => {
  const id = useRouter().query.slug as string;

  // const {
  //   mutate,
  //   isLoading: isCreating,
  //   isError,
  //   error,
  // } = api.feedback.add.useMutation({
  //   onSuccess: () => {
  //     void ctx.feedback.invalidate();
  //   },
  // });

  const { data } = api.roomList.byRoomUrl.useQuery({
    roomUrl: id,
  });
  // TODO: better error message here
  if (!data) return null;
  // if (isError) {
  //   return (
  //     <div className="mx-auto">
  //       <NextError
  //         title={error.message}
  //         statusCode={error.data?.httpStatus ?? 500}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className=" no-scrollbar h-screen bg-gradient-to-br from-gray-800 via-zinc-900 to-stone-900 pb-10">
        {/* {content && <Rating onContent={setContent} onButton={setStar} />}
        {!content && <Thanks star={star!} setShowForm={setShowForm} />} */}
        <FeedBackReview
          title={data?.title}
          description={data?.description}
          roomUrl={data?.roomUrl}
        />
      </div>
    </>
  );
};

export default FeedbackPage;
