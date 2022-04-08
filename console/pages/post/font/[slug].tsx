import { useRouter } from "next/router";
import ProviderPost, { ConsumerPost } from "components/Context/ContextPost";
import LayoutPost from "components/Layout/LayoutPost";
import TabGeneral from "components/Post/TabGeneral";

const dummyDescription = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`;

export default function Page() {
    const { query } = useRouter();
    return (
        <ProviderPost>
            <ConsumerPost>
                {({ post: { title, publish, description } }) => (
                    <LayoutPost>
                        {!query.tab || query.tab === "general" ? (
                            <>
                                <TabGeneral />

                                <div style={{ paddingBlock: "1em", paddingRight: "1em" }}>
                                    <h1
                                        style={{
                                            color: publish ? "currentcolor" : "var(--accents-4)"
                                        }}
                                    >
                                        {title}
                                    </h1>
                                    <p>{description ?? dummyDescription}</p>
                                </div>
                            </>
                        ) : (
                            "Not Found"
                        )}
                    </LayoutPost>
                )}
            </ConsumerPost>
        </ProviderPost>
    );
}
