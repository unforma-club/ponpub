import styles from "styles/pp-screenshoot.module.scss";
import {
    CSSProperties,
    DetailedHTMLProps,
    InputHTMLAttributes,
    PropsWithChildren,
    TextareaHTMLAttributes
} from "react";

type ScreenshootProps = {
    title?: string;
    description?: string;
    image?: string;
};

const boxStyle: CSSProperties = {
    padding: "2em",
    borderRadius: "0.25em",
    border: "1px solid var(--accents-6)"
};

const paragraph: CSSProperties = {
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    lineClamp: 2,
    WebkitLineClamp: 2
};

interface InputTextAreaProps
    extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    type: "google" | "twitter";
}

function ScreenInputTextArea(props: InputTextAreaProps) {
    const { type, ...rest } = props;
    return (
        <label className={styles.field_label} style={{ color: "var(--google-foreground)" }}>
            <textarea
                className={styles.field_text}
                spellCheck={false}
                rows={2}
                style={{
                    resize: "vertical",
                    fontSize: "0.875em",
                    minHeight: "3em",
                    maxHeight: "5em",
                    ...rest.style
                }}
                {...rest}
            />
        </label>
    );
}

interface InputTextProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type: "google" | "twitter";
}

function ScreenInputText(props: InputTextProps) {
    const { type, ...rest } = props;
    return (
        <label
            className={styles.field_label}
            style={{
                color:
                    type === "google"
                        ? "var(--google-foreground-link)"
                        : "var(--twitter-foreground)",
                fontWeight: 600
            }}
        >
            <input
                type="text"
                className={styles.field_text}
                spellCheck={false}
                style={{ fontSize: "1.25em", ...rest.style }}
                {...rest}
            />
        </label>
    );
}

function ScreenshootGoogle(props: PropsWithChildren<ScreenshootProps>) {
    const { title, children } = props;
    return (
        <div
            style={{
                ...boxStyle,
                backgroundColor: "var(--google-background)"
            }}
        >
            <div
                style={{
                    marginBottom: "2em",
                    display: "grid",
                    gridTemplateColumns: "max-content 1fr",
                    alignItems: "center",
                    gap: "calc(var(--grid-gap) * 2)"
                }}
            >
                <div
                    style={{
                        color: "var(--google-foreground)",
                        width: "3em",
                        height: "3em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.25em"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="3em"
                        height="3em"
                        fill="currentColor"
                    >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z" />
                    </svg>
                </div>
                <div
                    style={{
                        height: "3em",
                        width: "100%",
                        backgroundColor: "var(--google-background-search-bar)",
                        borderRadius: "2em",
                        border: "1px solid var(--google-foreground)",
                        display: "flex",
                        alignItems: "center",
                        paddingInline: "1.5em"
                    }}
                >
                    {title.split(" ")[0]}
                </div>
            </div>

            <div
                style={{
                    color: "var(--google-foreground)",
                    fontSize: "0.75em",
                    marginBottom: "0.15em"
                }}
            >
                {window.location.origin}
            </div>

            {children}
        </div>
    );
}

function ScreenshootTwitter(props: PropsWithChildren<ScreenshootProps>) {
    const { title, description, image, children } = props;
    return (
        <div
            style={{
                ...boxStyle,
                backgroundColor: "var(--twitter-background)",
                color: "var(--twitter-foreground)",
                display: "flex",
                alignItems: "flex-start",
                gap: "calc(var(--grid-gap) * 2)"
            }}
        >
            <div
                style={{
                    borderRadius: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "3em",
                    height: "3em",
                    backgroundColor: "#52b1ef",
                    padding: "0.5em"
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="3em"
                    height="3em"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                </svg>
            </div>

            <div style={{ width: "100%" }}>
                <div style={{ fontSize: "1em", marginBottom: "1em" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--grid-gap)" }}>
                        <span style={{ fontWeight: "bold" }}>My Twitter</span>
                        <span style={{ fontSize: "0.875em", color: "var(--accents-8)" }}>
                            @my_twitter • 1m
                        </span>
                    </div>
                    <p style={{ marginBlock: "0.5em", fontSize: "0.875em" }}>
                        Check this site fellas
                    </p>
                </div>

                <div
                    style={{
                        borderRadius: "1em",
                        border: "1px solid var(--accents-6)",
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    {!image && (
                        <div
                            style={{
                                position: "relative",
                                aspectRatio: "1.92/1",
                                backgroundColor: "var(--accents-2)",
                                borderBottom: "1px solid var(--accents-6)"
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="50%"
                                height="50%"
                                fill="currentColor"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.414 0L20 15.01V5zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                            </svg>
                        </div>
                    )}
                    <div style={{ padding: "1em" }}>
                        <div style={{ fontSize: "0.875em", color: "var(--accents-8)" }}>
                            {window.location.host}
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ScreenshootGoogle, ScreenshootTwitter, ScreenInputText, ScreenInputTextArea };
