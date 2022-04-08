import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface LayoutMainProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function LayoutMain(props: LayoutMainProps) {
    const { children, ...rest } = props;
    return (
        <div
            {...rest}
            style={{
                // marginLeft: -180,
                paddingInline: "3em",
                width: "100%",
                maxWidth: 1600,
                margin: "0 auto",
                ...rest.style
            }}
        >
            {children}
        </div>
    );
}
