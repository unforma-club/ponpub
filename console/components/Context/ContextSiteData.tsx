import type { PropsWithChildren } from "react";
import type { BaseResponse } from "types/response";
import type { BaseSiteData } from "types/site";
import { createContext } from "react";
import { KeyedMutator } from "swr";

type ResponseSiteData = BaseResponse & {
    data: BaseSiteData;
};
type ContextSiteDataAttr = BaseSiteData & { mutateSiteData: KeyedMutator<ResponseSiteData> };

type ProviderSiteDataProps = PropsWithChildren<{
    siteData: BaseSiteData;
    mutateSiteData: KeyedMutator<ResponseSiteData>;
}>;

export const ContextSiteData = createContext<ContextSiteDataAttr>(undefined!);
ContextSiteData.displayName = "Site Data Context";
export const ConsumerSiteData = ContextSiteData.Consumer;
export default function ProviderSiteData(props: ProviderSiteDataProps) {
    const { children, siteData, mutateSiteData } = props;
    return (
        <ContextSiteData.Provider value={{ ...siteData, mutateSiteData }}>
            {children}
        </ContextSiteData.Provider>
    );
}
