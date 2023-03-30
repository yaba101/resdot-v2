const RoomListSkeleton = () => {
  return (
    <div className="w- m-6 flex h-44 animate-pulse flex-col rounded-md shadow-lg sm:w-80">
      {/* <div className="h-48 rounded-t dark:bg-gray-700"></div> */}
      <div className="flex-1 space-y-4 px-4 py-8 dark:bg-gray-900 sm:p-8">
        <div className="h-10 w-full rounded dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default RoomListSkeleton;
