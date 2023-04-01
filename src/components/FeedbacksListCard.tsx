/* eslint-disable @typescript-eslint/no-unsafe-call */
import Image from "next/image";
import { format } from "date-fns";
import React from "react";
type FeedbacksListCardProps = {
  message: string;
  rating: string;
  userName?: string;
  createdAt: Date;
};

const FeedbacksListCard = ({
  message,
  rating,
  userName,
  createdAt,
}: FeedbacksListCardProps) => {
  return (
    <div className="container mx-auto mb-4 flex w-full max-w-lg flex-col divide-y divide-gray-700 rounded-md  border border-gray-400 bg-transparent bg-gradient-to-t from-zinc-900 via-zinc-900 to-zinc-900 p-6 shadow-lg shadow-slate-800 dark:text-gray-100">
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          {/* <div>
            <Image
              src="https://source.unsplash.com/100x100/?portrait"
              alt=""
              className="h-12 w-12 rounded-full object-cover dark:bg-gray-500"
            />
          </div> */}
          <div>
            <h4 className="font-bold">{userName}</h4>
            <div className="flex space-x-4 text-sm dark:text-gray-400">
              <span>{format(createdAt, "dd MMM yyyy")}</span>
              <span>{format(createdAt, "h:mm a")}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 dark:text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-5 w-5 fill-current"
          >
            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
          </svg>
          <span className="text-xl font-bold">{rating}</span>
        </div>
      </div>
      <div className="space-y-2 p-4 text-sm dark:text-gray-200">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default FeedbacksListCard;
