import { ContextSiteData } from "components/Context/ContextSiteData";
import { useContext } from "react";
export default function useSiteData() {
    return useContext(ContextSiteData);
}
