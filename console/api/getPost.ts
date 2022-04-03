import type { BaseResponse } from "types/response";
import type { BasePost } from "types/post";
import fetchJson from "libs/fetchJson";

export type GetPost = BaseResponse & { data: BasePost };
export default async function getPost(slug: string): Promise<GetPost> {
    const post = await fetchJson<GetPost>(`/api/v1/post/${slug}`);
    return post;
}
