import { useRouter } from "next/router";

export default function Page() {
    const { query } = useRouter();
    return (
        <div>
            Detail Font Page
            <pre>{JSON.stringify(query, null, 2)}</pre>
        </div>
    );
}

Page.requireAuth = true;
