import AppHeader from "components/AppHeader";
import LayoutMain from "components/Layout/LayoutMain";

export default function Page() {
    return (
        <LayoutMain>
            <AppHeader breadCrumbSlice={1} />
            Page Fonts
        </LayoutMain>
    );
}
