import styles from "styles/menu.module.scss";
import type { HTMLAttributes, JSXElementConstructor, ReactElement } from "react";
import { memo, Children, useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";

type UCTreeProps = HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    parent: ReactElement<any, string | JSXElementConstructor<any>>;
    grid?: boolean;
};

type ExpandArrowProps = {
    state: boolean;
    type: "top" | "bottom";
};

function ExpandArrow({ state, type }: ExpandArrowProps) {
    return (
        <AnimatePresence initial={state} exitBeforeEnter>
            {state && (
                <motion.div
                    animate={{ opacity: 1, height: "1em" }}
                    initial={{ opacity: 0, height: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                        position: "relative",
                        height: "1em",
                        width: "100%",
                        zIndex: 10
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            width: "1.5em",
                            height: "1.5em",
                            position: "absolute",
                            left: 0,
                            top: type === "top" && 0,
                            bottom: type === "bottom" && 0,
                            transform: `translate(-35%, 0%)`
                        }}
                    >
                        {type === "top" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
                            </svg>
                        )}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const UCTree = memo<UCTreeProps>((props) => {
    const { children, parent, defaultOpen } = props;
    const refUl = useRef<HTMLUListElement>(null);
    const childLength = Children.count(children);
    const [mounted, setMounted] = useState(false);
    const [expand, setExpand] = useState(false);
    const maxChild = 10;
    const heightIfMoreThanMaxChild = `calc(2em * ${maxChild} + 3em)`;

    const cbAnimation = useCallback(() => {
        if (defaultOpen) {
            setExpand(true);
        } else {
            setExpand(false);
        }
    }, [defaultOpen]);

    useEffect(() => void setMounted(() => (defaultOpen ? true : false)), []);

    useIsomorphicLayout(() => {
        if (!refUl.current) return;
        const el = refUl.current;
        if (expand) {
            el.style.height = heightIfMoreThanMaxChild;
            el.style.overflowY = "scroll";
            return () => {
                el.style.removeProperty("height");
                el.style.removeProperty("overflow-y");
            };
        }
    }, [refUl, expand, defaultOpen]);

    return (
        <motion.ul
            initial={defaultOpen}
            animate={defaultOpen ? "show" : "hide"}
            className={styles.container}
            variants={{
                show: {
                    transition: {
                        staggerDirection: 1,
                        staggerChildren: childLength >= maxChild ? 0.03 : 0.05,
                        delayChildren: childLength >= maxChild ? 0.03 : 0.05
                    }
                },
                hide: {
                    transition: {
                        staggerDirection: 1,
                        staggerChildren: childLength >= maxChild ? 0.03 : 0.05,
                        delayChildren: childLength >= maxChild ? 0.03 : 0.05
                    }
                }
            }}
        >
            <motion.li className={styles.list}>{parent}</motion.li>

            <li style={{ width: "100%", position: "relative" }}>
                <ExpandArrow state={expand && childLength > maxChild} type="top" />
                <ul
                    ref={refUl}
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        height: mounted && childLength > maxChild && heightIfMoreThanMaxChild
                    }}
                >
                    {Children.map(children, (child, i) => (
                        <motion.li
                            key={i}
                            className={styles.list}
                            variants={{
                                hide: { display: "none" },
                                show: { display: "block" }
                            }}
                            style={{
                                padding: `0 0 0 calc(var(--grid-gap) * 2)`,
                                flexShrink: 0
                            }}
                            onAnimationComplete={(e) => {
                                if (e === "show") {
                                    if (i === maxChild) cbAnimation();
                                } else {
                                    if (i === childLength - maxChild) cbAnimation();
                                }
                            }}
                        >
                            {child}
                        </motion.li>
                    ))}
                </ul>
                <ExpandArrow state={expand && childLength > maxChild} type="bottom" />
            </li>
        </motion.ul>
    );
});

UCTree.displayName = "UC-Tree";

export default UCTree;
