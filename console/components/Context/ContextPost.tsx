import type { PropsWithChildren } from "react";
import type { BaseResponse } from "types/response";
import type { BasePost } from "types/post";
import type { GetPost } from "api/getPost";
import { createContext, useContext } from "react";
import { useRouter } from "next/router";
import useSWR, { KeyedMutator } from "swr";
import LayoutMain from "components/Layout/LayoutMain";
import AppHeader from "components/AppHeader";

type ContextPostAttr = {
    post?: BasePost;
    mutatePost: KeyedMutator<GetPost>;
};

type ProviderPostProps = PropsWithChildren<{
    post?: BaseResponse & { data: BasePost };
    type?: "blog" | "font";
}>;

type LoaderProps = PropsWithChildren<{}>;

const ContextPost = createContext<ContextPostAttr>(undefined!);
ContextPost.displayName = "Post Context";
export const usePost = () => useContext(ContextPost);
export const ConsumerPost = ContextPost.Consumer;

function Loader(props: LoaderProps) {
    return (
        <LayoutMain>
            <AppHeader breadCrumbSlice={1} />
            {props.children}
        </LayoutMain>
    );
}
export default function ProviderPost(props: ProviderPostProps) {
    const { children } = props;
    const { query } = useRouter();
    const { data: clientData, mutate: mutateData } = useSWR<GetPost>(`/api/v1/post/${query.slug}`);

    if (!clientData) return <Loader>Loading...</Loader>;
    if (!clientData.success || !clientData.data) return <Loader>Not Found</Loader>;

    return (
        <ContextPost.Provider value={{ post: clientData.data, mutatePost: mutateData }}>
            {children}
        </ContextPost.Provider>
    );
}
