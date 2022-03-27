import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        as="font"
                        type="font/woff2"
                        href="/fonts/BDO-Grotesk/BDOGrotesk-VF.woff2"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
