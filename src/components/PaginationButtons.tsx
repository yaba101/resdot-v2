import React from "react";

type PaginationProps = {
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  currentPage: number;
  maxPage: number;
};

const PaginationButtons = ({
  currentPage,
  setCurrentPage,
  maxPage,
}: PaginationProps) => {
  return (
    <div className="mt-10 flex justify-around">
      <button
        onClick={() => {
          setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
        }}
        disabled={currentPage === 1}
        className={`mr-10 flex justify-between py-2 px-4 text-sm font-medium ${
          currentPage === 1
            ? "cursor-not-allowed rounded-lg border border-gray-300 bg-white text-gray-100  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-300"
            : " rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }`}
      >
        <svg
          aria-hidden="true"
          className="mr-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        Previous
      </button>
      <button
        onClick={() =>
          setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
        }
        disabled={currentPage === maxPage && currentPage > 1}
        className={`ml-10 flex justify-between py-2 px-4 text-sm font-medium ${
          currentPage === maxPage
            ? "cursor-not-allowed rounded-lg border border-gray-300 bg-white text-gray-100  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-300"
            : " rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }`}
      >
        Next
        <svg
          aria-hidden="true"
          className="ml-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default PaginationButtons;
