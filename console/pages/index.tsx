import type { BasePost } from "types/post";
import type { GetPosts } from "api/getPosts";
import NextLink from "next/link";
import useSWR from "swr";
import { useSession } from "components/Context/ContextSession";
import LayoutMain from "components/Layout/LayoutMain";

type ListProps = {
    data: BasePost;
};

function List(props: ListProps) {
    const { data } = props;
    return (
        <li>
            <NextLink href={`/post/${data.type}/[slug]`} as={`/post/${data.type}/${data.slug}`}>
                <a>
                    <span>{data.title}</span>
                </a>
            </NextLink>
        </li>
    );
}

type PostListProps = {
    data: BasePost[];
    category: "font" | "blog";
};

function PostList(props: PostListProps) {
    const { category, data } = props;
    return (
        <div style={{ marginBottom: "2em" }}>
            <div style={{ textTransform: "capitalize" }}>{category}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {data
                    .filter((item) => item.type === category)
                    .map((item, i) => (
                        <List key={i} data={item} />
                    ))}
            </ul>
        </div>
    );
}

export default function Page() {
    const { session } = useSession();
    const { data } = useSWR<GetPosts>("/api/v1/post");
    return (
        <>
            <LayoutMain style={{ paddingTop: "6em" }}>
                {data && data.success && data.data && data.data.length !== 0 ? (
                    <>
                        <PostList category="font" data={data.data} />
                        <PostList category="blog" data={data.data} />
                    </>
                ) : (
                    "There's no post yet"
                )}

                <pre>{JSON.stringify(session, null, 2)}</pre>
            </LayoutMain>
        </>
    );
}
