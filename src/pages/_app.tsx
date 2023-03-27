import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import {
  SignedIn,
  SignedOut,
  ClerkProvider,
  RedirectToSignIn,
} from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const isPublic = ["/"].includes(pathname);

  return (
    <ClerkProvider {...pageProps}>
      {isPublic && <Component {...pageProps} />}
      {!isPublic && (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
