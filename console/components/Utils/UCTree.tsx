import styles from "styles/menu.module.scss";
import type { HTMLAttributes } from "react";
import { memo, Children, useState, useRef, useEffect, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";

type UCTreeProps = HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    grid?: boolean;
};

function buildVariants(state: boolean): Variants {
    return {
        show: {
            transition: {
                staggerDirection: 1,
                staggerChildren: state ? 0.03 : 0.05,
                delayChildren: state ? 0.03 : 0.05
            }
        },
        hide: {
            transition: {
                staggerDirection: 1,
                staggerChildren: state ? 0.03 : 0.05,
                delayChildren: state ? 0.03 : 0.05
            }
        }
    };
}

const UCTree = memo<UCTreeProps>((props) => {
    const { children, defaultOpen } = props;
    const refUl = useRef<HTMLUListElement>(null);
    const childLength = Children.count(children);
    const [mounted, setMounted] = useState(false);
    const [expand, setExpand] = useState(false);
    const maxChild = 10;
    const heightIfMoreThanMaxChild = `calc(2em * ${maxChild} + 4.5em)`;

    const cbAnimation = useCallback(() => {
        if (defaultOpen) {
            setExpand(true);
        } else {
            setExpand(false);
        }
    }, [defaultOpen]);

    useEffect(() => {
        setMounted(() => (defaultOpen ? true : false));
    }, []);

    useIsomorphicLayout(() => {
        if (!refUl.current) return;
        const el = refUl.current;
        if (expand) {
            const originalOverflowY = window.getComputedStyle(el).overflowY;
            el.style.height = heightIfMoreThanMaxChild;
            el.style.overflowY = "scroll";
            return () => {
                el.style.removeProperty("height");
                el.style.overflowY = originalOverflowY;
            };
        }
    }, [refUl, expand, defaultOpen]);

    return (
        <motion.ul
            ref={refUl}
            initial={defaultOpen}
            animate={defaultOpen ? "show" : "hide"}
            variants={buildVariants(childLength >= maxChild)}
            data-expand={defaultOpen}
            className={styles.container}
            style={{
                height: mounted && childLength > maxChild && heightIfMoreThanMaxChild,
                overflow: mounted && childLength > maxChild && "visible hidden"
            }}
        >
            {Children.map(
                children,
                (child, i) =>
                    i === 0 && (
                        <li
                            key={i}
                            data-expand={defaultOpen}
                            className={styles.list}
                            data-role="parent"
                        >
                            {child}
                        </li>
                    )
            )}

            {Children.map(
                children,
                (child, i) =>
                    i !== 0 && (
                        <motion.li
                            key={i}
                            className={styles.list}
                            data-role="child"
                            variants={{
                                hide: { display: "none" },
                                show: { display: "block" }
                            }}
                            onAnimationComplete={(e) => {
                                if (e === "show") {
                                    if (i === maxChild) cbAnimation();
                                } else {
                                    // Notice that `i === childLength - maxChild`
                                    // This allow to reverse stagger animation back and forth
                                    // This should always be like it
                                    if (i === childLength - maxChild) cbAnimation();
                                }
                            }}
                        >
                            {child}
                        </motion.li>
                    )
            )}
        </motion.ul>
    );
});

UCTree.displayName = "UC-Tree";

export default UCTree;
