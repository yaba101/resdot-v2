import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
const Header = () => {
  return (
    <div className=" overflow-auto bg-slate-900">
      <header className="z-1 flex w-full flex-wrap border-b bg-white py-6 text-sm dark:border-gray-700 dark:bg-slate-900 sm:flex-nowrap sm:justify-start sm:py-4">
        <nav className="mx-auto flex w-full max-w-7xl basis-full items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-5 text-2xl font-bold text-gray-50 md:mr-8 ">
            Resdot
          </div>
          <span className="text-base font-extrabold text-white">|</span>
          <div className="ml-5 text-xl font-medium text-gray-300">
            Dashboard
          </div>

          <div className="ml-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
            <div className="relative"></div>

            <div className="flex flex-row items-center justify-end gap-2">
              <div className=" relative inline-flex">
                <SignedIn>
                  {/* Mount the UserButton component */}
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  {/* Signed out users get sign in button */}
                  <SignInButton />
                </SignedOut>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
