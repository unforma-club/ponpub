import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { GetPost } from "api/getPost";
import { useRouter } from "next/router";
import { mutate } from "swr";
import NextHead from "next/head";
import fetchJson from "libs/fetchJson";
import { usePost } from "components/Context/ContextPost";
import UCButton from "components/Utils/UCButton";
import UCSelect from "components/Utils/UCSelect";
import AppHeader from "components/AppHeader";
import LayoutMain from "./LayoutMain";

interface LayoutPostProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

async function updater(slug: string, body: { [key: string]: any }) {
    const request = await fetchJson<GetPost>(`/api/v1/post/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return request;
}

export default function LayoutPost(props: LayoutPostProps) {
    const { children, ...rest } = props;
    const queries = ["general", "meta", "tags"];

    const { pathname, query, replace } = useRouter();
    const { post, mutatePost } = usePost();
    const { slug, type, publish } = post;
    const newQueries = post.type === "font" ? queries.concat("typeface") : queries;

    return (
        <>
            <NextHead>
                <title>{`${post.type.charAt(0).toUpperCase() + post.type.slice(1)} / ${
                    post.title
                }`}</title>
            </NextHead>

            <LayoutMain>
                <AppHeader breadCrumbSlice={1}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "calc(var(--grid-gap) / 2)",
                            flexShrink: 0
                        }}
                    >
                        <UCSelect
                            items={["publish", "draft"]}
                            value={publish ? "publish" : "draft"}
                            onChange={async (e) => {
                                await updater(slug, {
                                    publish: e.target.value === "publish" ?? false
                                });
                                await mutatePost();
                            }}
                            style={{
                                height: "2em",
                                border: "1px solid transparent",
                                borderRadius: "0.25em",
                                backgroundColor: "var(--accents-2)"
                            }}
                        />
                        <UCButton
                            style={{
                                // backgroundColor: "#cd5c5c",
                                backgroundColor: "var(--accents-2)",
                                height: "2em",
                                border: "none"
                            }}
                            onClick={async () => {
                                fetchJson<GetPost>(`/api/v1/post/${slug}?type=${type}`, {
                                    method: "DELETE",
                                    headers: { "Content-Type": "application/json" }
                                }).then((res) => {
                                    mutate(`/api/v1/post?type=${type}`).then(() => {
                                        if (!res.data) {
                                            replace(`/post/new?type=${type}`);
                                        } else {
                                            replace(
                                                pathname,
                                                `/post/${res.data.type}/${res.data.slug}`
                                            );
                                        }
                                    });
                                });
                            }}
                        >
                            Delete
                        </UCButton>
                    </div>
                </AppHeader>

                <div style={{ minHeight: "200vh" }}>{children}</div>
            </LayoutMain>
        </>
    );
}
