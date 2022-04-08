import useBoolean from "hooks/use-boolean";
import UCTree from "components/Utils/UCTree";
import { useSession } from "components/Context/ContextSession";

export default function MenuAccount() {
    const { handleLogout } = useSession();
    const { value, toggle } = useBoolean(false, true);
    return (
        <UCTree defaultOpen={value}>
            <button onClick={toggle} data-ellipsis="Account">
                <span>Account</span>
            </button>
            <button onClick={handleLogout}>
                <span>Logout</span>
            </button>
        </UCTree>
    );
}
