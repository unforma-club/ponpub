import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface UCInputProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    error?: string;
    footer?: string;
}

export default function UCInput(props: UCInputProps) {
    const { label, error, title, footer, ...rest } = props;
    return (
        <label
            title={title ?? rest.name}
            style={{
                position: "relative",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "0.25em",
                overflow: "hidden",
                ...rest.style
            }}
        >
            {title && (
                <div
                    style={{
                        width: "100%",
                        height: "1.5em",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {title}
                </div>
            )}

            <input
                {...rest}
                style={{
                    background: "none",
                    height: "2.25em",
                    width: "100%",
                    font: "inherit",
                    display: "block",
                    appearance: "none",
                    border: "1px solid var(--accents-6)",
                    borderRadius: "inherit",
                    paddingInline: "var(--grid-gap)",
                    // paddingRight: "2em",
                    backgroundColor: "var(--accents-2)",
                    color: "var(--accents-12)"
                }}
            />

            {footer && (
                <div
                    style={{ fontSize: "0.75em", color: "var(--accents-6)", marginBlock: "0.25em" }}
                >
                    {footer}
                </div>
            )}

            {error && (
                <span
                    style={{
                        position: "absolute",
                        right: 0,
                        height: "100%",
                        aspectRatio: "1/1",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        pointerEvents: "none",
                        touchAction: "none",
                        paddingRight: "0.1em"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1.3em"
                        height="1.3em"
                        fill="red"
                    >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 2c5.523 0 10 4.477 10 10 0 .727-.077 1.435-.225 2.118l-1.782-1.783a8 8 0 1 0-4.375 6.801 3.997 3.997 0 0 0 1.555 1.423A9.956 9.956 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2zm7 12.172l1.414 1.414a2 2 0 1 1-2.93.11l.102-.11L19 14.172zM12 15c1.466 0 2.785.631 3.7 1.637l-.945.86C13.965 17.182 13.018 17 12 17c-1.018 0-1.965.183-2.755.496l-.945-.86A4.987 4.987 0 0 1 12 15zm-3.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                    </svg>
                </span>
            )}
        </label>
    );
}
