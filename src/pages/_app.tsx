import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { SDSThemeProvider } from "@semicolondsm/react-emotion-theme";
import { Global } from "@emotion/react";
import { globalStyles } from "../styles/globalStyles";
import cookies from "next-cookies";
import { setToken } from "@/utils/function/tokenManager";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 1000,
        refetchInterval: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <SDSThemeProvider mode="light-only">
            <Global styles={globalStyles} />ß
            <Component {...pageProps} />
          </SDSThemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const { ctx, Component } = appContext;
  let appProps = {};

  if (Component.getInitialProps) {
    appProps = (await Component.getInitialProps(ctx)) || {};
  }

  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies["accessToken"];
  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = allCookies["refreshToken"] || "";
    setToken(accessTokenByCookie, refreshTokenByCookie);
  }

  return { ...appProps };
};
