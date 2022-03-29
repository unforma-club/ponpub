import { useRouter } from "next/router";

export default function Page() {
    const { asPath, basePath } = useRouter();
    return (
        <div>
            Page Index
            <a href={`/api/auth?callback_url=${basePath}${asPath}`}>To Auth</a>
        </div>
    );
}
