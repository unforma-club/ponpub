import type { ChangeEvent, DetailedHTMLProps, LabelHTMLAttributes } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import fetchJson from "libs/fetchJson";
import useSiteData from "hooks/use-site-data";
import useBoolean from "hooks/use-boolean";
import UCTree from "./Utils/UCTree";
import MenuFont from "./Menu/MenuFont";
import MenuBlog from "./Menu/MenuBlog";
import MenuArchive from "./Menu/MenuArchive";
import MenuAccount from "./Menu/MenuAccount";
import MenuTheme from "./Menu/MenuTheme";
import MenuSetting from "./Menu/MenuSetting";

interface AvatarProps
    extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    image: string;
}

function Avatar(props: AvatarProps) {
    const { image } = props;
    const { value: hover, setValue: setHover } = useBoolean(false);
    function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (!e.target.files) return;

        const formData = new FormData();
        formData.append("site_logo", e.target.files[0]);
        fetchJson("/api/v1/content/images/logo", {
            method: "POST",
            body: formData
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
    return (
        <label
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                position: "relative",
                width: "3em",
                aspectRatio: "1/1",
                backgroundColor: "var(--accents-3)",
                flexShrink: 0,
                border: "1px solid var(--accents-6)",
                borderRadius: "0.25em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accents-12)",
                cursor: "pointer",
                overflow: "hidden"
            }}
        >
            <img src={image} width="48" height="48" />
            <input
                type="file"
                name="site_logo"
                accept=".png, .jpg, .jpeg"
                onChange={handleChangeFile}
                style={{ display: "none" }}
            />

            <AnimatePresence exitBeforeEnter initial={false}>
                {hover && (
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "just" }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--accents-2)",
                            fontSize: "0.625em",
                            textAlign: "center"
                        }}
                    >
                        Change Logo
                    </motion.div>
                )}
            </AnimatePresence>
        </label>
    );
}

export default function AppAside() {
    const { pathname } = useRouter();
    const { title, description } = useSiteData();

    return (
        <aside style={{ width: "16em" }}>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    paddingBlock: "2em",
                    paddingLeft: "2em",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }}
            >
                <div
                    style={{
                        marginBottom: "calc(var(--grid-gap) * 2 - 1px)",
                        // marginBottom: -1,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "var(--grid-gap)"
                    }}
                >
                    <Avatar image="/static/images/logo/site_logo.png" />

                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            width: "100%",
                            overflow: "hidden"
                        }}
                    >
                        <li
                            style={{
                                width: "100%",
                                height: "2em",
                                borderRadius: "0.25em",
                                display: "flex",
                                alignItems: "center"
                                // backgroundColor: "var(--accents-2)",
                                // paddingInline: "calc(var(--grid-gap) / 2)",
                                // border: "1px solid var(--accents-6)"
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    width: "100%",
                                    color: "var(--accents-12)",
                                    fontSize: "1.25em",
                                    fontWeight: "bold"
                                }}
                            >
                                {title}
                            </span>
                        </li>
                        <li
                            style={{
                                width: "100%",
                                height: "1em",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    width: "100%",
                                    fontSize: "0.75em",
                                    color: "var(--accents-8)"
                                }}
                            >
                                {description}
                            </span>
                        </li>
                    </ul>
                </div>

                <UCTree defaultOpen={pathname === "/"}>
                    <NextLink href="/">
                        <a data-active={pathname === "/"} data-ellipsis="Dashboard">
                            <span>Dashboard</span>
                        </a>
                    </NextLink>
                </UCTree>

                <MenuFont />
                <MenuBlog />
                {/* <MenuArchive /> */}
                <UCTree defaultOpen={pathname === "/member"}>
                    <NextLink href="/member">
                        <a data-active={pathname === "/member"} data-ellipsis="Member">
                            <span>Member</span>
                        </a>
                    </NextLink>
                </UCTree>
                <MenuSetting />
                <MenuAccount />
                <MenuTheme />
                <div style={{ fontSize: "0.75em", marginTop: "1em", color: "var(--accents-6)" }}>
                    Powered by <br />
                    <a href="https://unforma.club" target="_blank" rel="noreferrer noopener">
                        Unforma&trade; Club
                    </a>
                </div>
            </div>
        </aside>
    );
}
