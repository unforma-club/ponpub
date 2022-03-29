import { useRouter } from "next/router";
import NextLink from "next/link";
import UCTree from "components/Utils/UCTree";

function HeaderBlog() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <NextLink href="/editor/blog/blog-1?type=blog">
                <a>
                    <span>Blog</span>
                </a>
            </NextLink>
            <NextLink href="/post/new?type=blog">
                <a
                    style={{
                        borderRadius: "100%",
                        aspectRatio: "1/1",
                        marginLeft: "0.1em",
                        backgroundColor: "var(--accents-12)",
                        color: "var(--accents-1)",
                        overflow: "hidden",
                        padding: 0,
                        borderColor: "transparent"
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            height="1.5em"
                            width="1.5em"
                            fill="currentColor"
                            style={{ boxSizing: "content-box" }}
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                    </span>
                </a>
            </NextLink>
        </div>
    );
}

export default function MenuBlog() {
    const { pathname } = useRouter();
    const parentActive = pathname.includes("/editor/blog");
    return (
        <UCTree defaultOpen={parentActive} parent={<HeaderBlog />}>
            {Array(30)
                .fill(true)
                .map((_, i) => (
                    <NextLink
                        key={i}
                        href="/editor/blog/[slug]"
                        as={`/editor/blog/blog-${i + 1}?type=blog`}
                    >
                        <a>
                            <span>Blog {i + 1}</span>
                        </a>
                    </NextLink>
                ))}
        </UCTree>
    );
}
