import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-slate-100 bg-white/75 shadow-lg backdrop-blur-sm dark:border-gray-100 dark:bg-gray-900 ">
      <div className="container mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className={buttonVariants({
            variant: "link",
            className: "m-5",
            size: "lg",
          })}
        >
          Resdot
        </Link>
        <div className=" gap-4 p-6 md:flex">
          <>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "default",
              })}
            >
              Sign In
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
