/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import FeedBackReview from "@/components/Review";

const FeedbackPage = () => {
  const id = useRouter().query.slug as string;
  const { data } = api.roomList.byRoomUrl.useQuery({
    roomUrl: id,
  });
  // TODO: better error message here
  if (!data) return null;
  return (
    <>
      <div className=" no-scrollbar h-screen bg-gradient-to-br from-gray-800 via-zinc-900 to-stone-900 pb-10">
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
