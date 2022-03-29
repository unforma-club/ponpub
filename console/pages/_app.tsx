import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ThemeProvider as ProviderTheme } from "next-themes";
import fetchJson from "libs/fetchJson";
import ProviderSession from "components/Context/ContextSession";
import SessionGuard from "components/SessionGuard";
import AppAside from "components/AppAside";

export default function CustomApp(props: AppProps) {
    const { Component, pageProps } = props;
    return (
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
    );
}
