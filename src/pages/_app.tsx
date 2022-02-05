import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../lib/auth/config";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  const pca = new PublicClientApplication(msalConfig);

  return (
    <RecoilRoot>
      <MsalProvider instance={pca}>
        <Component {...pageProps} />
      </MsalProvider>
    </RecoilRoot>
  );
}

export default MyApp;
