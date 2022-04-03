export default async function fetchJson<JSON = unknown>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const NEXT_PUBLIC_ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
    const isServer = typeof window === "undefined";
    const response = await fetch(`${isServer ? `${NEXT_PUBLIC_ORIGIN}${input}` : input}`, init);
    const data = await response.json();
    return data;
}
