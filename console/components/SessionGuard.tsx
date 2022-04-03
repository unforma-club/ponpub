import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "./Context/ContextSession";

export default function SessionGuard(props: PropsWithChildren<{}>) {
    const { children } = props;
    const { initializing, session } = useSession();
    return (
        <>
            <AnimatePresence initial={false} exitBeforeEnter>
                {initializing && !session && (
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
                            justifyContent: "center"
                        }}
                    >
                        Loading...
                    </motion.main>
                )}
            </AnimatePresence>

            <AnimatePresence initial={true} exitBeforeEnter>
                {!initializing && session && (
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "max-content 1fr",
                            minHeight: "100vh"
                        }}
                    >
                        {children}
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
}
