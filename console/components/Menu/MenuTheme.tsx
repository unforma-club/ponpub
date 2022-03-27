import { useTheme } from "next-themes";
import useBoolean from "hooks/use-boolean";
import UCTree from "components/Utils/UCTree";

export default function MenuTheme() {
    const { themes, setTheme } = useTheme();
    const { value, toggle } = useBoolean(false, true);

    return (
        <UCTree defaultOpen={value} parent={<button onClick={toggle}>Theme</button>}>
            {themes.map((item: string, i: number) => (
                <button key={i} onClick={() => setTheme(item)}>
                    {item}
                </button>
            ))}
        </UCTree>
    );
}
