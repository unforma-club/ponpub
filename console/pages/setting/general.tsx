import { Formik } from "formik";
import useSiteData from "hooks/use-site-data";
import fetchJson from "libs/fetchJson";
import AppHeader from "components/AppHeader";
import LayoutMain from "components/Layout/LayoutMain";
import UCInput from "components/Utils/UCInput";
import {
    ScreenshootGoogle,
    ScreenshootTwitter,
    ScreenInputText,
    ScreenInputTextArea
} from "components/Utils/Screenshoot";

export default function Page() {
    const { title, description, mutateSiteData, meta } = useSiteData();
    return (
        <LayoutMain>
            <AppHeader />

            <div style={{ marginBottom: "1em" }}>
                <span style={{ fontSize: "1.25em", fontWeight: "bold" }}>Publication Info</span>
            </div>

            <Formik
                enableReinitialize
                initialValues={{ title, description, meta }}
                onSubmit={(v, a) => {
                    if (!v.title || !v.description) return;
                    fetchJson("/api/v1/admin/setting/site", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...v })
                    })
                        .then(() => mutateSiteData())
                        .catch((err) => console.log(err));
                }}
            >
                {({ handleSubmit, handleChange, values, submitForm }) => (
                    <div>
                        <div style={{ marginBottom: "2em" }}>
                            <div style={{ fontSize: "2em", fontWeight: "bold" }}>
                                Tittle &amp; Description
                            </div>
                            <div style={{ color: "var(--accents-8)" }}>
                                The details used to identify your publication around the web
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            style={{
                                width: "100%",
                                maxWidth: 720,
                                display: "flex",
                                flexDirection: "column",
                                gap: "2em"
                            }}
                        >
                            <div>
                                <UCInput
                                    name="title"
                                    type="text"
                                    placeholder="Ponpub"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={() => values.title !== title && submitForm()}
                                    footer="The name of your site"
                                    style={{ display: "block", marginBlock: "0.5em" }}
                                />
                                <UCInput
                                    name="description"
                                    type="text"
                                    placeholder="Discover, Craft, and Deliver"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={() =>
                                        values.description !== description && submitForm()
                                    }
                                    footer="Used in your meta data and search results"
                                    style={{ display: "block", marginBlock: "0.5em" }}
                                />
                            </div>

                            <ScreenshootGoogle
                                title={values.title}
                                description={values.description}
                            >
                                <ScreenInputText
                                    type="google"
                                    name="meta.facebook.title"
                                    placeholder="Ponpub | Font Publishing Tools"
                                    value={values.meta.facebook.title}
                                    onChange={handleChange}
                                    onBlur={() =>
                                        values.meta.facebook.title !== meta.facebook.title &&
                                        submitForm()
                                    }
                                />

                                <ScreenInputTextArea
                                    type="google"
                                    placeholder="Write description about your site"
                                    name="meta.facebook.description"
                                    value={values.meta.facebook.description}
                                    onChange={handleChange}
                                    onBlur={() =>
                                        values.meta.facebook.description !==
                                            meta.facebook.description && submitForm()
                                    }
                                />
                            </ScreenshootGoogle>

                            <ScreenshootTwitter
                                title={values.title}
                                description={values.description}
                            >
                                <ScreenInputText
                                    type="twitter"
                                    name="meta.twitter.title"
                                    placeholder="Ponpub | Font Publishing Tools"
                                    value={values.meta.twitter.title}
                                    onChange={handleChange}
                                    onBlur={() =>
                                        values.meta.twitter.title !== meta.twitter.title &&
                                        submitForm()
                                    }
                                />

                                <ScreenInputTextArea
                                    type="twitter"
                                    placeholder="Write description about your site"
                                    name="meta.twitter.description"
                                    value={values.meta.twitter.description}
                                    onChange={handleChange}
                                    onBlur={() =>
                                        values.meta.twitter.description !==
                                            meta.twitter.description && submitForm()
                                    }
                                />
                            </ScreenshootTwitter>
                        </form>
                    </div>
                )}
            </Formik>
        </LayoutMain>
    );
}
