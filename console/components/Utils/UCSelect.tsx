import styles from "styles/uc-select.module.scss";
import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";

interface NewProps
    extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    items: string[];
}

export default function UCSelect(props: NewProps) {
    const { name, items, style, className, ...rest } = props;
    return (
        <label
            title={name}
            style={style}
            className={className ? `${styles.container} ${className}` : styles.container}
        >
            <select className={styles.select} name={name} {...rest}>
                {items.map((item, i) => (
                    <option key={i}>{item}</option>
                ))}
            </select>

            <span className={styles.suffix}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="1.1em"
                    width="1.1em"
                    fill="currentColor"
                >
                    <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
                </svg>
            </span>
        </label>
    );
}
