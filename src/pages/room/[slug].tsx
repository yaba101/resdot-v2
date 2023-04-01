import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "@/utils/api";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/components/ui/Input";
import { buttonVariants } from "@/components/ui/Button";
import { SideModal } from "@/components/SideModal";
import FeedbacksListCard from "@/components/FeedbacksListCard";
import { Fragment, useState } from "react";
import PaginationButtons from "@/components/PaginationButtons";
// import { Toasting } from "@/components/ui/Toast";
// import { toast } from "@/components/ui/Toast";

const RoomPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { query } = useRouter();

  const { data, isLoading, isError } = api.roomList.byRoomUrl.useQuery({
    roomUrl: (query.slug as string) ?? "",
  });
  const { data: feedbackData } = api.feedback.list.useInfiniteQuery(
    {
      roomUrl: (query.slug as string) ?? "",
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );
  const PER_PAGE = 5;
  const pageLength = feedbackData?.pages.map((page) => page.items.length);

  const maxPage = Math.ceil((pageLength as unknown as number) / PER_PAGE);
  const begin = (currentPage - 1) * PER_PAGE;
  const end = begin + PER_PAGE;
  // TODO: proper error message here
  if (isError) return <div className="">There has been a Error</div>;
  return (
    <>
      {isLoading ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-stone-900  pb-10"></div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-stone-900  pb-10">
          <div className="pt-10 pl-10">
            <Link
              className={buttonVariants({
                variant: "ghost",
                className: "  dark:text-white",
              })}
              href="/dashboard"
            >
              &larr; {" Back"}
            </Link>
          </div>
          <div className="mx-auto mb-4 max-w-sm rounded-lg border border-gray-700 bg-white p-4 shadow-2xl dark:border-gray-800 dark:bg-transparent dark:bg-gray-900">
            <SideModal
              id={data.id}
              title={data.title}
              description={data.description}
            />
            <h1 className=" scroll-m-20 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700 dark:text-gray-100">
              {data.title}
            </h1>
            <hr className="p-2 text-white" />
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              {data.description}
            </p>
          </div>
          <div className="relative mx-auto w-96">
            <div className="z-20 rounded-md shadow-md sm:min-w-0 sm:flex-1">
              <Input
                className="mx-auto w-96 shadow-2xl"
                readOnly
                value={`feedback/${data.roomUrl ?? ""}`}
                placeholder="This is the roomurl"
              />
              {!isLoading ? (
                <>
                  <CopyButton
                    valueToCopy={`feedback/${data.roomUrl}`}
                    className="animate-in fade-in absolute inset-y-0 top-0 right-0 duration-300"
                    type="button"
                  />
                </>
              ) : null}
            </div>
          </div>

          <div className="p-3"></div>
          {feedbackData?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id || index}>
              {page.items.length === 0 && (
                <p className="mt-2 p-3 text-center text-fuchsia-200">
                  There no feedback yet!
                </p>
              )}
              {page.items?.slice(begin, end).map((item) => (
                <FeedbacksListCard
                  message={item.message}
                  key={item.id}
                  createdAt={item.createdAt}
                  rating={item.star}
                />
              ))}
              {page.items.length !== 0 && (
                <PaginationButtons
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  maxPage={maxPage}
                />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default RoomPage;
