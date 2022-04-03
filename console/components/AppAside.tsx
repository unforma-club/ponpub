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
        <aside style={{ width: "14em" }}>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    padding: "1em",
                    display: "flex",
                    flexDirection: "column",
                    gap: "calc(var(--grid-gap) / 2)"
                }}
            >
                <UCTree defaultOpen={pathname === "/"}>
                    <NextLink href="/">
                        <a data-active={pathname === "/"}>
                            <span>Ponpub</span>
                        </a>
                    </NextLink>
                </UCTree>

                <MenuFont />
                <MenuBlog />
                <MenuAccount />
                <MenuTheme />
            </div>
        </aside>
    );
}
