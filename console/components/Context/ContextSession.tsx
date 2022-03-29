import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import fetchJson from "libs/fetchJson";

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
    const [session, setSession] = useState<any>(data?.data);
    const [initializing, setInitializing] = useState(true);

    function handleLogout() {
        fetchJson(`/api/v1/user/logout`, { method: "POST" }).then(() => window.location.reload());
    }

    useEffect(() => {
        mutate()
            .then((res) => {
                if (res && res.success) {
                    setSession(res.data);
                } else {
                    // Remember that we're set `basePath` as `/ponpub`
                    // It's important to use `window` object instead of `useRouter()`
                    // Forcing url to be `https://domain.com/api/*`
                    // If we use `useRouter()` the url will be `https://domain.com/ponpub/api/*`
                    window.location.replace(`/api/auth?callback_url=${window.location.href}`);
                }
            })
            .then(() => setInitializing(false));
    }, [data, mutate, setSession, setInitializing]);

    return (
        <ContextSession.Provider
            value={{ initializing, session, mutateSession: mutate, handleLogout }}
        >
            {children}
        </ContextSession.Provider>
    );
}
