import { useRouter } from "next/router";

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function Page() {
    const { asPath } = useRouter();
    return (
        <div>
            Page Index
            <button
                onClick={() =>
                    window.location.replace(
                        `/api/auth?callback_url=${NEXT_PUBLIC_SITE_URL}/ponpub${asPath}`
                    )
                }
            >
                To Auth
            </button>
        </div>
    );
}
