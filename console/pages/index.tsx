import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { BasePost } from "types/post";
import NextLink from "next/link";
import NextHead from "next/head";
import getPosts, { GetPosts } from "api/getPosts";
import { useSession } from "components/Context/ContextSession";

type ServerProps = {
    posts: GetPosts;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

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

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
    const posts = await getPosts();
    return { props: { posts } };
};

export default function Page(props: PageProps) {
    const { posts } = props;
    const { session } = useSession();
    return (
        <>
            <NextHead>
                <title>Ponpub</title>
            </NextHead>

            <div style={{ padding: "1em" }}>
                {posts && posts.success && posts.data && posts.data.length > 1 ? (
                    <>
                        <PostList category="font" data={posts.data} />
                        <PostList category="blog" data={posts.data} />
                    </>
                ) : (
                    "There's no post yet"
                )}

                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </>
    );
}
