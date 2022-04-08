import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { KeyedMutator } from "swr";
import fetchJson from "libs/fetchJson";

type PayloadSession = {
    success: boolean;
    statusCode: number;
    data?: any;
};

type ContextSessionAttr = {
    // initializing: boolean;
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

export default function ProviderSession(
    props: PropsWithChildren<{ session: any; mutateSession: KeyedMutator<PayloadSession> }>
) {
    const { children, session, mutateSession } = props;
    function handleLogout() {
        fetchJson(`/api/v1/user/logout`, { method: "POST" }).then(() => window.location.reload());
    }

    return (
        <ContextSession.Provider value={{ session, mutateSession, handleLogout }}>
            {children}
        </ContextSession.Provider>
    );
}
