import "styles/global.scss";
// import { NextPage } from "next";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ThemeProvider as ProviderTheme } from "next-themes";
import fetchJson from "libs/fetchJson";
import ProviderSession from "components/Context/ContextSession";
import SessionGuard from "components/SessionGuard";
import AppAside from "components/AppAside";

// type CustomAppProps = AppProps & {
//     Component: NextPage & {
//         requireAuth?: boolean;
//     };
// };

export default function CustomApp(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <>
            <SWRConfig value={{ fetcher: fetchJson, loadingTimeout: 10000 }}>
                <ProviderTheme
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
