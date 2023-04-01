import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { dark } from "@clerk/themes";
import {
  SignedIn,
  SignedOut,
  ClerkProvider,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/Toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const isPublic = ["/"].includes(pathname);

  return (
    <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
      {isPublic && <Component {...pageProps} />}
      {!isPublic && (
        <>
          <SignedIn>
            <Toaster position="top-right" />
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
