import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ReturnType {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue(): void;
    setFalse(): void;
    toggle(): void;
}

export default function useBoolean(
    defaultValue?: boolean,
    closeOnRouteChange?: boolean
): ReturnType {
    const [value, setValue] = useState(!!defaultValue);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    const toggle = () => setValue((prev) => !prev);

    const { events } = useRouter();
    useEffect(() => {
        if (!closeOnRouteChange) return;
        if (!value) return;

        events.on("routeChangeStart", setFalse);
        events.on("routeChangeComplete", setFalse);
        events.on("routeChangeError", setFalse);
        return () => {
            events.off("routeChangeStart", setFalse);
            events.off("routeChangeComplete", setFalse);
            events.off("routeChangeError", setFalse);
        };
    }, [events, value, closeOnRouteChange]);

    return { value, setValue, setTrue, setFalse, toggle };
}
