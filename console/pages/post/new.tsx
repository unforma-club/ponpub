import type { BaseResponse } from "types/response";
import type { BasePost } from "types/post";
import { useCallback } from "react";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { Formik } from "formik";
import fetchJson from "libs/fetchJson";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";
import UCSelect from "components/Utils/UCSelect";
import UCInput from "components/Utils/UCInput";
import UCButton from "components/Utils/UCButton";

type Step = {
    name: string;
};

const steps: Step[] = [{ name: "type" }, { name: "title" }];

export default function Page() {
    const { pathname, replace, query, push } = useRouter();
    const allowedType = ["font", "blog", "goods"];
    useIsomorphicLayout(() => {
        if (allowedType.indexOf(query.type as string) === -1) {
            selectHandler("font");
        }
    }, [query]);

    const selectHandler = useCallback(
        (v: string) => replace(`${pathname}?type=${v}`, `${pathname}?type=${v}`, { shallow: true }),
        [pathname, replace]
    );

    const postHandler = useCallback(
        (title: string) => {
            const slug = title.trim().replace(/\s/g, "-").toLowerCase();
            fetchJson<BaseResponse & { data: BasePost }>("/api/v1/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug, type: query.type })
            })
                .then((res) => {
                    mutate(`/api/v1/post?type=${query.type}`).then(() =>
                        replace(
                            `/post/${query.type}/[slug]`,
                            `/post/${query.type}/${res.data.slug}`
                        )
                    );
                })
                .catch((err) => console.log(err));
        },
        [query, replace]
    );

    return (
        <div
            style={{
                position: "relative",
                padding: "1em 1em 1em 0",
                height: "100vh"
            }}
        >
            <UCSelect
                items={allowedType.concat("mamita")}
                value={query.type as string}
                onChange={(e) => selectHandler(e.target.value)}
                style={{
                    height: "2em",
                    borderRadius: "0.25em",
                    backgroundColor: "var(--accents-12)",
                    color: "var(--accents-1)"
                }}
            />

            <Formik initialValues={{ title: "" }} onSubmit={(v, a) => postHandler(v.title)}>
                {({ values, handleSubmit, handleChange, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <UCInput
                            name="title"
                            type="text"
                            placeholder="Post Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <div>
                            <UCButton type="submit">Create</UCButton>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
