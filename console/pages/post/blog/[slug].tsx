import { useRouter } from "next/router";
import ProviderPost, { ConsumerPost } from "components/Context/ContextPost";
import LayoutPost from "components/Layout/LayoutPost";
import TabGeneral from "components/Post/TabGeneral";

export default function Page() {
    const { query } = useRouter();
    return (
        <ProviderPost>
            <ConsumerPost>
                {({ post: { title, publish } }) => (
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
