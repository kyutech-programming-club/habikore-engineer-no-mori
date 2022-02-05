import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../lib/auth/config';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const pca = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={pca}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

export default MyApp
