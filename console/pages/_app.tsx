import "styles/global.scss";
import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { ThemeProvider as ProviderTheme } from "next-themes";
import NextHead from "next/head";
import nProgress from "nprogress";
import fetchJson from "libs/fetchJson";
import ProviderSession from "components/Context/ContextSession";
import SessionGuard from "components/SessionGuard";
import AppAside from "components/AppAside";

nProgress.configure({
    showSpinner: true,
    easing: "ease-in",
    speed: 250,
    minimum: 0.01,
    trickleSpeed: 80
});

export default function CustomApp(props: AppProps) {
    const { Component, pageProps } = props;
    const { events } = useRouter();

    useEffect(() => {
        const handleStart = () => nProgress.start();
        const handleStop = () => nProgress.done();

        events.on("routeChangeStart", handleStart);
        events.on("routeChangeComplete", handleStop);
        events.on("routeChangeError", handleStop);

        return () => {
            events.off("routeChangeStart", handleStart);
            events.off("routeChangeComplete", handleStop);
            events.off("routeChangeError", handleStop);
        };
    }, [events]);
    return (
        <>
            <NextHead>
                <title>Ponpub</title>
            </NextHead>
            <SWRConfig value={{ fetcher: fetchJson, loadingTimeout: 10000 }}>
                <ProviderTheme
                    storageKey="ponpub-theme"
                    defaultTheme="system"
                    themes={["dark", "light"]}
                    disableTransitionOnChange
                    enableColorScheme
                    enableSystem
                >
                    <ProviderSession>
                        <SessionGuard>
                            <AppAside />
                            <Component {...pageProps} />
                        </SessionGuard>
                    </ProviderSession>
                </ProviderTheme>
            </SWRConfig>
        </>
    );
}
