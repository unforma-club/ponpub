import NextLink from "next/link";

type PostHeaderProps = {
    type: string;
    slug?: string;
};

export default function PostHeader(props: PostHeaderProps) {
    const { type, slug } = props;
    return (
        <>
            <NextLink
                href={{
                    pathname: slug ? `/post/${type}/[slug]` : `/post/new`,
                    query: slug ? { slug } : { type }
                }}
            >
                <a>
                    <span>{type}</span>
                </a>
            </NextLink>

            <NextLink href={`/post/new?type=${type}`}>
                <a
                    data-square="true"
                    style={{
                        marginLeft: 0,
                        aspectRatio: "1/1",
                        padding: 0,
                        minWidth: 0,
                        borderRadius: "100%"
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            aspectRatio: "1/1"
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
        </>
    );
}
