import NextLink from "next/link";
import { useRouter } from "next/router";
import UCTree from "components/Utils/UCTree";

const statics = ["general", "membership", "staff"];

export default function MenuSetting() {
    const { pathname } = useRouter();
    return (
        <UCTree defaultOpen={pathname.includes("/setting")}>
            <NextLink href="/setting/general">
                <a>
                    <span>Settings</span>
                </a>
            </NextLink>

            {statics.map((item, i) => (
                <NextLink key={i} href={`/setting/${item}`}>
                    <a data-active={pathname === `/setting/${item}`} data-ellipsis={item}>
                        <span>{item}</span>
                    </a>
                </NextLink>
            ))}
        </UCTree>
    );
}
