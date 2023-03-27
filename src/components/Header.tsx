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
    <div className="bg-gray-800 pt-8 pb-8 lg:pb-16">
      <div className="container mx-auto mt-10 flex flex-col items-start justify-between px-6 lg:flex-row lg:items-center">
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
    </div>
  );
};

export default Header;
