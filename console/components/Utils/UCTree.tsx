import styles from "styles/menu.module.scss";
import type { HTMLAttributes, JSXElementConstructor, ReactElement } from "react";
import { memo, Children, useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";

type UCTreeProps = HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    parent: ReactElement<any, string | JSXElementConstructor<any>>;
    grid?: boolean;
};

const UCTree = memo<UCTreeProps>((props) => {
    const { children, parent, defaultOpen } = props;
    const refUl = useRef<HTMLUListElement>(null);
    const childLength = Children.count(children);
    const [mounted, setMounted] = useState(false);
    const [expand, setExpand] = useState(false);
    const maxChild = 10;
    const heightIfMoreThanMaxChild = `calc(2em * ${maxChild} + 2.75em)`;

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
            // el.style.marginTop = "0.3em";
            // el.style.marginBottom = "0.3em";
            // el.style.borderTop = "1px solid";
            // el.style.borderBottom = "1px solid";
            // el.style.backgroundColor = "red";
            return () => {
                el.style.removeProperty("height");
                el.style.removeProperty("overflow-y");
                // el.style.removeProperty("margin-top");
                // el.style.removeProperty("margin-bottom");
                // el.style.removeProperty("border-top");
                // el.style.removeProperty("border-bottom");
                // el.style.removeProperty("background-color");
            };
        }
    }, [refUl, expand, defaultOpen]);

    return (
        <motion.ul
            initial={defaultOpen}
            animate={defaultOpen ? "show" : "hide"}
            className={styles.container}
            style={{ marginBlock: "0.3em" }}
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

            <li
                style={{
                    width: "100%",
                    position: "relative",
                    paddingTop: "0.3em"
                }}
            >
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
                        gap: "0.3em",
                        // marginBlock: defaultOpen && childLength > 1 ? "0.3em" : "0.15em",
                        // marginBlock: "0.3em",
                        height: mounted && childLength > maxChild && heightIfMoreThanMaxChild,
                        transition: "all 500ms cubic-bezier(1, 0, 0, 1)"
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
            </li>
        </motion.ul>
    );
});

UCTree.displayName = "UC-Tree";

export default UCTree;
