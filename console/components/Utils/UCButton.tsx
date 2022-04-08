import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface UCButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export default function UCButton(props: UCButtonProps) {
    const { children, ...rest } = props;
    return (
        <button
            {...rest}
            style={{
                // appearance: "none",
                background: "none",
                border: "1px solid var(--accents-6)",
                borderRadius: "0.25em",
                font: "inherit",
                height: "2.25em",
                backgroundColor: rest.disabled ? "var(--accents-3)" : "var(--accents-4)",
                color: rest.disabled ? "var(--accents-6)" : "var(--accents-12)",
                padding: "0 var(--grid-gap)",
                margin: 0,
                cursor: "pointer",
                whiteSpace: "nowrap",
                ...rest.style
            }}
        >
            {children}
        </button>
    );
}
