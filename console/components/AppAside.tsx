import { useRouter } from "next/router";
import NextLink from "next/link";
import UCTree from "./Utils/UCTree";
import MenuFont from "./Menu/MenuFont";
import MenuAccount from "./Menu/MenuAccount";
import MenuTheme from "./Menu/MenuTheme";

export default function AppAside() {
    const { pathname, basePath, asPath } = useRouter();
    return (
        <aside
            style={{
                width: "13em",
                padding: "1em",
                transform: "scale(var(--tree-scale))",
                transformOrigin: "top left"
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
            <MenuAccount />
            <MenuTheme />
            <div>
                <a href="http://localhost:9090">You App Bro</a>
            </div>
            <div>
                <a href={`http://localhost:9090/api/auth?callback_url=${basePath}${asPath}`}>
                    To Auth
                </a>
            </div>
        </aside>
    );
}
