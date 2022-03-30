import { useRouter } from "next/router";
import NextLink from "next/link";
import UCTree from "./Utils/UCTree";
import MenuFont from "./Menu/MenuFont";
import MenuBlog from "./Menu/MenuBlog";
import MenuAccount from "./Menu/MenuAccount";
import MenuTheme from "./Menu/MenuTheme";

export default function AppAside() {
    const { pathname } = useRouter();
    return (
        <aside
            style={{
                width: "13em",
                padding: "1em",
                transform: "scale(var(--tree-scale))",
                transformOrigin: "top left",
                display: "flex",
                flexDirection: "column",
                gap: "calc(var(--grid-gap) / 2)"
            }}
        >
            <UCTree
                defaultOpen={pathname === "/"}
                parent={
                    <NextLink href="/">
                        <a data-active={pathname === "/"}>Ponpub</a>
                    </NextLink>
                }
            />
            <MenuFont />
            <MenuBlog />
            <MenuAccount />
            <MenuTheme />
        </aside>
    );
}
