import { useTheme } from "next-themes";
import useBoolean from "hooks/use-boolean";
import UCTree from "components/Utils/UCTree";

export default function MenuTheme() {
    const { theme, themes, setTheme } = useTheme();
    const { value, toggle } = useBoolean(false, true);

    return (
        <UCTree defaultOpen={value}>
            <button onClick={toggle}>
                <span>Theme</span>
            </button>
            {themes.map((item: string, i: number) => (
                <button key={i} data-active={theme === item} onClick={() => setTheme(item)}>
                    <span>{item}</span>
                </button>
            ))}
        </UCTree>
    );
}
