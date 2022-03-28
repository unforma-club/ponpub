import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import useSWR, { KeyedMutator } from "swr";
import fetchJson from "libs/fetchJson";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";

type PayloadSession = {
    success: boolean;
    statusCode: number;
    data?: any;
};

type ContextSessionAttr = {
    initializing: boolean;
    session: any;
    mutateSession: KeyedMutator<PayloadSession>;
    handleLogout(): void;
};

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const ContextSession = createContext<ContextSessionAttr>(undefined!);
export function useSession() {
    const session = useContext(ContextSession);
    if (!session) throw new Error("`useSession` must be used within `ProviderSession`");
    return session;
}
export const ConsumerSession = ContextSession.Consumer;

export default function ProviderSession(props: PropsWithChildren<{}>) {
    const { children } = props;
    const { data, mutate } = useSWR<PayloadSession>("/api/v1/session/ping");
    const [session, setSession] = useState<any>(null);
    const [initializing, setInitializing] = useState(true);

    function handleLogout() {
        fetchJson("https://ponpub-test.unforma.club/api/v1/user/logout", { method: "POST" }).then(
            () => mutate()
        );
    }

    const { asPath, isReady, replace } = useRouter();

    useIsomorphicLayout(() => {
        mutate()
            .then((res) => {
                if (res && res.success) {
                    setSession(res.data);
                } else {
                    const isAuthPath = !!asPath.includes("/auth");
                    if (!isAuthPath && isReady) {
                        const newUrl = asPath;
                        window.location.replace(
                            `https://ponpub-test.unforma.club/api/auth?callback_url=${NEXT_PUBLIC_SITE_URL}/ponpub${newUrl}`
                        );
                    }
                }
            })
            .then(() => setInitializing(false));
    }, [data, asPath, isReady, mutate, replace]);

    return (
        <ContextSession.Provider
            value={{ initializing, session, mutateSession: mutate, handleLogout }}
        >
            {children}
        </ContextSession.Provider>
    );
}
