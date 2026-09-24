import "@/styles/globals.css";
import theme from "@/styles/theme";
import { appWithTranslation } from "next-i18next/pages";
import type { AppProps } from "next/app";
import { Jost } from "next/font/google";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Script from "next/script";

const jostFont = Jost({
    subsets: ["cyrillic"],
    display: "swap",
});

type DMPAppProps = {
    host: string;
};

function DMPApp({ Component, pageProps }: AppProps<DMPAppProps>) {
    const { host } = pageProps;

    if (!host) throw new Error("Host not found in page props");

    return (
        <>
            <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-HKTLV62H91" />
            <Script id="google-analytics" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-HKTLV62H91');
                `}
            </Script>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Head>
            <ThemeProvider theme={theme}>
                <style jsx global>{`
                    :root {
                        --font-jost: ${jostFont.style.fontFamily};
                    }
                `}</style>

                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default appWithTranslation(DMPApp);
