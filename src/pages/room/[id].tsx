import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "@/utils/api";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/components/ui/Input";
import { buttonVariants } from "@/components/ui/Button";

const RoomPage = () => {
  const { query } = useRouter();
  console.log("query id", query.id);

  const { data, isLoading } = api.roomList.byId.useQuery({
    roomUrl: (query.id as string) ?? "",
  });
  if (!data?.roomUrl) return null;
  return (
    <>
      <div className="via-zinc-900-800 min-h-screen bg-gradient-to-br from-gray-900 to-stone-900  pb-10">
        <div className="pt-10 pl-10">
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: " text-gray-100 dark:text-gray-100",
            })}
            href="/dashboard"
          >
            &larr; {" Back"}
          </Link>
          <div className="flex flex-col items-center gap-6">
            <h2 className=" mt-10 mb-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700 dark:text-gray-100">
              {data.title}
            </h2>
          </div>
        </div>

        <div className="relative mx-auto w-96">
          <div className="z-20 rounded-md shadow-md sm:min-w-0 sm:flex-1">
            <Input
              className="mx-auto w-96"
              readOnly
              value={data.roomUrl ?? ""}
              placeholder="This is the roomurl"
            />
            {!isLoading ? (
              <>
                <CopyButton
                  valueToCopy={data.roomUrl}
                  className="animate-in fade-in absolute inset-y-0 top-0 right-0 duration-300"
                  type="button"
                />
              </>
            ) : null}
          </div>
        </div>

        <div className="p-3"></div>
      </div>
    </>
  );
};

export default RoomPage;
