import type { BaseResponse } from "types/response";
import { useCallback } from "react";
import { mutate } from "swr";
import { useRouter } from "next/router";
import fetchJson from "libs/fetchJson";
import useIsomorphicLayout from "hooks/use-isomorphic-layout";
import UCSelect from "components/Utils/UCSelect";

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

            <div>
                <button
                    onClick={() => {
                        fetchJson<BaseResponse & { data: { slug: string } }>("/api/v1/post", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                title: "Glyphs To UFO",
                                slug: "glyphs-to-ufo",
                                type: query.type
                            })
                        })
                            .then((res) => {
                                mutate(`/api/v1/post?type=${query.type}`).then(() =>
                                    push(
                                        `/post/${query.type}/[slug]`,
                                        `/post/${query.type}/${res.data.slug}`
                                    )
                                );
                            })
                            .catch((err) => console.log(err));
                    }}
                >
                    Create
                </button>
            </div>
        </div>
    );
}
