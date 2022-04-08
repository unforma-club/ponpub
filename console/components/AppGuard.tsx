import type { PropsWithChildren } from "react";
import type { BaseResponse } from "types/response";
import type { BaseSiteData } from "types/site";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextHead from "next/head";
import useSWR from "swr";
import useBoolean from "hooks/use-boolean";
import ProviderSession from "./Context/ContextSession";
import ProviderSiteData from "./Context/ContextSiteData";

type AppGuardProps = PropsWithChildren<{}>;
type ResponseSiteData = BaseResponse & {
    data: BaseSiteData;
};
type ResponseSession = BaseResponse & {
    data: any;
};

export default function AppGuard(props: AppGuardProps) {
    const { children } = props;

    const { value: initializingSiteData, setValue: setInitializingSiteData } = useBoolean(true);
    const { value: initializingSession, setValue: setInitializingSession } = useBoolean(true);

    const { data: fetchSiteData, mutate: mutateSiteData } = useSWR<ResponseSiteData>(
        "/api/v1/admin/setting/site"
    );
    const { data: fetchSession, mutate: mutateSession } =
        useSWR<ResponseSession>("/api/v1/session/ping");

    const [siteData, setSiteData] = useState<BaseSiteData | null>(fetchSiteData?.data);
    const [session, setSession] = useState<{ email: string } | null>(fetchSession?.data);

    useEffect(() => {
        // setTimeout(() => {
        mutateSiteData()
            .then((res) => {
                if (res && res.success && res.data) {
                    setSiteData(res.data);
                } else {
                    setSiteData(null);
                }
            })
            .then(() => setInitializingSiteData(false))
            .then(() => {
                // setTimeout(() => {
                mutateSession()
                    .then((res) => {
                        if (res && res.success && res.data) {
                            setSession(res.data);
                        } else {
                            setSession(null);
                            // Remember that we're set `basePath` as `/ponpub`
                            // It's important to use `window` object instead of `useRouter()`
                            // Forcing url to be `https://domain.com/api/*`
                            // If we use `useRouter()` the url will be `https://domain.com/ponpub/api/*`
                            window.location.replace(
                                `/api/auth?callback_url=${window.location.href}`
                            );
                        }
                    })
                    .then(() => setInitializingSession(false));
                // }, 2000);
            });
        // }, 1000);
    }, [
        fetchSiteData,
        fetchSession,
        mutateSiteData,
        mutateSession,
        setInitializingSiteData,
        setInitializingSession
    ]);

    const showApp =
        !initializingSiteData && !initializingSession && siteData !== null && session !== null;

    return (
        <>
            <AnimatePresence initial={false} exitBeforeEnter>
                {(initializingSiteData || initializingSession) && (
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 1000,
                            backgroundColor: "var(--accents-1)",
                            color: "var(--accents-12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2em",
                            fontWeight: "bold"
                        }}
                    >
                        <NextHead>
                            <title>
                                {initializingSiteData
                                    ? "Initializing..."
                                    : initializingSession
                                    ? "Checking Session..."
                                    : "Ponpub"}
                            </title>
                        </NextHead>
                        <div>
                            {initializingSiteData
                                ? "Initializing..."
                                : initializingSession
                                ? "Checking Session..."
                                : "Ponpub"}
                        </div>
                    </motion.main>
                )}
            </AnimatePresence>

            <AnimatePresence initial={true} exitBeforeEnter>
                {showApp && (
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "max-content 1fr",
                            minHeight: "100vh",
                            gap: "calc(var(--grid-gap) * 2)"
                        }}
                    >
                        <NextHead>
                            <title>{siteData.title}</title>
                        </NextHead>
                        <ProviderSiteData siteData={siteData} mutateSiteData={mutateSiteData}>
                            <ProviderSession session={session} mutateSession={mutateSession}>
                                {children}
                            </ProviderSession>
                        </ProviderSiteData>
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
}
