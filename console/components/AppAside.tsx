import { useRouter } from "next/router";
import NextLink from "next/link";
import UCTree from "./Utils/UCTree";
import MenuTheme from "./Menu/MenuTheme";
import MenuFont from "./Menu/MenuFont";
import MenuAccount from "./Menu/MenuAccount";

export default function AppAside() {
    const { pathname } = useRouter();
    return (
        <aside
            style={{
                width: "13em",
                padding: "1em",
                transform: "scale(var(--tree-scale))",
                transformOrigin: "top left",
                transition: "transform 300ms cubic-bezier(0.5, 0, 0.3, 1)"
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
            <MenuTheme />
            <MenuAccount />
        </aside>
    );
}
