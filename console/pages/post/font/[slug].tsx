import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import type { BasePost } from "types/post";
import getPost from "api/getPost";
import getPosts from "api/getPosts";

type ServerProps = {
    font: BasePost;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page(props: PageProps) {
    const { font } = props;
    const { title } = font;
    return (
        <div>
            <h1>{title}</h1>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts("font");
    const paths = posts.data.map((item) => ({ params: { slug: item.slug } }));
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<ServerProps> = async ({ params }) => {
    const post = await getPost(params.slug as string);
    if (!post || !post.success || !post.data) return { notFound: true };
    return { props: { font: post.data }, revalidate: 10 };
};
