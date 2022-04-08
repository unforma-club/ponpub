import { BaseUser } from "./user";

export type BasePost = {
    id: string;
    title: string;
    slug: string;
    type: string;
    description?: string;
    author: BaseUser;
    publish: boolean;
    visibility: number;
    createdAt: string;
    updatedAt: string;
};
