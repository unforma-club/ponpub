import useBoolean from "hooks/use-boolean";
import UCTree from "components/Utils/UCTree";
import { useSession } from "components/Context/ContextSession";

export default function MenuAccount() {
    const { handleLogout } = useSession();
    const { value, toggle } = useBoolean(true, true);
    return (
        <UCTree defaultOpen={value} parent={<button onClick={toggle}>Account</button>}>
            <button onClick={handleLogout}>Logout</button>
        </UCTree>
    );
}
