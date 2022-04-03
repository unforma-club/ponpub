import type { GetPosts } from "api/getPosts";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useSWR from "swr";
import UCTree from "components/Utils/UCTree";
import PostHeader from "./PostHeader";

export default function MenuBlog() {
    const { pathname, query } = useRouter();
    const parentActive = pathname.includes("/post/blog");
    const queryBlog = query.type === "blog";
    const { data } = useSWR<GetPosts>("/api/v1/post?type=blog");

    return (
        <UCTree defaultOpen={parentActive || queryBlog}>
            <PostHeader
                type="blog"
                slug={data && data.success && data.data && data.data[0]?.slug}
            />

            {data &&
                data.success &&
                data.data.map((item, i) => (
                    <NextLink key={i} href="/post/blog/[slug]" as={`/post/blog/${item.slug}`}>
                        <a
                            data-active={query?.slug?.includes(item.slug)}
                            data-ellipsis={item.title}
                        >
                            <span>{item.title}</span>
                        </a>
                    </NextLink>
                ))}
        </UCTree>
    );
}
