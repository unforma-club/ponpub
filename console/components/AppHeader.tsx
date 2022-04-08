import styles from "styles/pp-header.module.scss";
import type { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useBreadCrumb from "hooks/use-breadcrumb";

type AppHeaderProps = PropsWithChildren<{
    breadCrumbSlice?: number;
}>;

type BreadcrumbProps = {
    label: any;
    lastIndex?: boolean;
    firstIndex?: boolean;
    href: string;
};
function Breadcrumb(props: BreadcrumbProps) {
    const { label, lastIndex, firstIndex, href } = props;
    const { asPath } = useRouter();
    return (
        <>
            {!firstIndex && (
                <li className={styles.beadcrumb_list} data-item="separator">
                    <span>/</span>
                </li>
            )}
            <li
                data-item="text"
                className={styles.beadcrumb_list}
                style={{
                    textTransform: "capitalize",
                    color: lastIndex ? "var(--accents-12)" : "inherit",
                    overflow: "hidden"
                }}
            >
                <NextLink href={href}>
                    <a className={styles.link} data-active={asPath === href}>
                        <span
                            style={{
                                // fontSize: "1.25em",
                                display: "block",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {label.replace(/-/g, " ")}
                        </span>
                    </a>
                </NextLink>
            </li>
        </>
    );
}

export default function AppHeader(props: AppHeaderProps) {
    const { children, breadCrumbSlice = 0 } = props;
    const { breadcrumbs, convertBreadcrumb } = useBreadCrumb();
    return (
        <header className={styles.container}>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "calc(var(--grid-gap) / 2)",
                    height: "100%",
                    color: "var(--accents-6)",
                    fontFeatureSettings: `"case"`,
                    overflow: "hidden"
                }}
            >
                {breadcrumbs.slice(breadCrumbSlice).map((item, i) => (
                    <Breadcrumb
                        key={i}
                        lastIndex={i === breadcrumbs.slice(breadCrumbSlice).length - 1}
                        firstIndex={i === 0}
                        label={convertBreadcrumb(item.breadcrumb)}
                        href={item.href}
                    />
                ))}
            </ul>

            {children}
        </header>
    );
}
