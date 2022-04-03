import type { BaseResponse } from "types/response";
import type { BasePost } from "types/post";
import fetchJson from "libs/fetchJson";

export type GetPosts = BaseResponse & { data: BasePost[] };
export default async function getPosts(type?: string): Promise<GetPosts> {
    let url = "/api/v1/post";
    if (type) {
        url = `/api/v1/post?type=${type}`;
    }
    const posts = await fetchJson<GetPosts>(url);
    return posts;
}
