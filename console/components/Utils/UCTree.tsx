import styles from "styles/menu.module.scss";
import { HTMLAttributes, JSXElementConstructor, memo, ReactElement, Children } from "react";
import { motion, Variants } from "framer-motion";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";

type UCTreeProps = HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    parent: ReactElement<any, string | JSXElementConstructor<any>>;
    grid?: boolean;
};

const VARIANTS_STAGGER_PARENT: Variants = {
    show: {
        transition: {
            staggerDirection: 1,
            staggerChildren: 0.025,
            delayChildren: 0.05
        }
    },
    hide: {
        transition: {
            staggerDirection: -1,
            staggerChildren: 0.025,
            delayChildren: 0.05
        }
    }
};

const UCTree = memo<UCTreeProps>((props) => {
    const { children, parent, defaultOpen } = props;
    const childLength = Children.count(children);

    useIsomorphicLayout(() => {
        if (!defaultOpen) return;
        if (childLength < 15) return;
        const rootProperty = "--tree-scale";
        const root = document.documentElement;
        const original = getComputedStyle(root).getPropertyValue(rootProperty);

        root.style.setProperty(rootProperty, "0.85");
        return () => root.style.setProperty(rootProperty, original);
    }, [defaultOpen, childLength]);

    return (
        <motion.ul
            initial={false}
            animate={defaultOpen ? "show" : "hide"}
            variants={VARIANTS_STAGGER_PARENT}
            className={styles.container}
        >
            <motion.li className={styles.list}>{parent}</motion.li>

            {childLength >= 1 &&
                Children.map(
                    children,
                    (child, i) =>
                        child && (
                            <motion.li
                                key={i}
                                className={styles.list}
                                style={{
                                    padding: `0 0 0 calc(var(--grid-gap) * 2)`
                                }}
                                variants={{
                                    hide: { display: "none" },
                                    show: { display: "initial" }
                                }}
                            >
                                {child}
                            </motion.li>
                        )
                )}
        </motion.ul>
    );
});

export default UCTree;
