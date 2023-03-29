import Link from "next/link";
import React, { Fragment, useState } from "react";
import PaginationButtons from "@/components/PaginationButtons";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { CreateModal } from "./Modal";

const RoomList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 5;

  const { user } = useUser();
  console.log(user?.id);

  const roomListQuery = api.roomList.list.useInfiniteQuery(
    {
      limit: 50,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const pageLength = roomListQuery.data?.pages.map((page) => page.items.length);

  const maxPage = Math.ceil((pageLength as unknown as number) / PER_PAGE);
  const begin = (currentPage - 1) * PER_PAGE;
  const end = begin + PER_PAGE;

  const ctx = api.useContext();

  const { mutate } = api.roomList.add.useMutation({
    onSuccess: () => {
      void ctx.roomList.invalidate();
    },
  });

  return (
    <>
      <div className="flex h-screen flex-col items-center bg-gradient-to-t from-zinc-800 via-emerald-900 to-gray-900 pt-10">
        <CreateModal />

        <div className="mt-8  rounded-lg border bg-white p-10 shadow-inner shadow-zinc-900 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-white md:text-xl">
            FeedBack Rooms
          </h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Connect with your audience via feedback, and make friends!
          </p>

          {roomListQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id || index}>
              {page.items.length === 0 && (
                <p className="mt-2 p-3 text-center text-fuchsia-200 shadow-2xl shadow-zinc-900">
                  There no room yet!
                </p>
              )}

              {page.items?.slice(begin, end)?.map((item) => (
                <ul className="my-4 space-y-3" key={item.id}>
                  <div className="flex ">
                    <li className="grow ">
                      <Link
                        href={`/rooms/${item.roomUrl}`}
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  </div>
                </ul>
              ))}
            </Fragment>
          ))}
        </div>
        <button
          onClick={() => {
            if (user) {
              mutate({
                title: "awesome",
                description: "hello motherfucker",
                userId: user?.id,
              });
            }
          }}
        >
          Post
        </button>
        <PaginationButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
        />
      </div>
    </>
  );
};

export default RoomList;
