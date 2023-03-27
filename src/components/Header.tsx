import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
const Header = () => {
  const { user } = useUser();

  return (
    <div className=" bg-slate-900">
      <div className="container mx-auto flex flex-col items-start justify-between p-10 px-6 lg:flex-row lg:items-center">
        <div className="flex flex-col items-start lg:flex-row lg:items-center">
          <div className="flex items-center">
            <div>
              <h5 className="text-md mb-1 font-bold leading-7 text-white">
                {user?.fullName}
              </h5>
            </div>
          </div>
          <div className="ml-0 mt-6  lg:ml-20 lg:mt-0">
            <h4 className="mb-2 text-2xl font-bold leading-tight text-white">
              Dashboard
            </h4>
          </div>
        </div>
        <div className="mt-6 lg:mt-0">
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
      <div className="border-b border-b-amber-400"></div>
    </div>
  );
};

export default Header;
