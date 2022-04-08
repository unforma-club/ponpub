import type { GetPost } from "api/getPost";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { Formik } from "formik";
import moment from "moment";
import fetchJson from "libs/fetchJson";
import { usePost } from "components/Context/ContextPost";
import UCButton from "components/Utils/UCButton";
import UCInput from "components/Utils/UCInput";

async function updater(slug: string, body: { [key: string]: any }) {
    const request = await fetchJson<GetPost>(`/api/v1/post/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return request;
}

export default function TabGeneral() {
    const { replace, pathname } = useRouter();
    const { post } = usePost();
    const { title, type, slug, createdAt, updatedAt } = post;

    return (
        <div style={{ width: "100%", maxWidth: 720 }}>
            <Formik
                enableReinitialize
                initialValues={{ title }}
                onSubmit={async (v, a) => {
                    if (!v.title) return;
                    const newSlug = v.title.trim().replace(/\s/g, "-").toLowerCase();
                    await updater(slug, {
                        title: v.title,
                        slug: newSlug
                    });

                    // Mutate all posts type
                    // Consumed by main menu
                    await mutate(`/api/v1/post?type=${type}`);
                    replace(pathname, `/post/${type}/${newSlug}`);
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur }) => (
                    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex" }}>
                        <UCInput
                            name="title"
                            type="text"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ marginRight: "var(--grid-gap)", width: "100%" }}
                        />
                        <UCButton type="submit" disabled={values.title === title}>
                            <span>Rename</span>
                        </UCButton>
                    </form>
                )}
            </Formik>

            <div
                style={{
                    marginTop: "4em",
                    fontSize: "0.875em",
                    lineHeight: 1.5
                }}
            >
                <div style={{ color: "var(--accents-6)" }}>
                    Created at{" "}
                    <span
                        style={{
                            backgroundColor: "var(--accents-6)",
                            color: "var(--accents-1)",
                            borderRadius: "1em",
                            paddingInline: "var(--grid-gap)"
                        }}
                    >
                        {moment(createdAt).format("MMMM Do YYYY")}
                    </span>
                </div>
                <div style={{ color: "var(--accents-6)" }}>
                    Last update {moment(updatedAt).startOf("minute").fromNow()}
                </div>
            </div>
        </div>
    );
}
