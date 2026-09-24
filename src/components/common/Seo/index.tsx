import { appConfig } from "@/appConfig";
import { getPageFromUrl, normalizeUrl } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";

type SeoProps = {
    innerPage: boolean;
    title: string;
    description?: string;
    image?: string;
    descriptionPagination?: string;
};

const Seo = (props: SeoProps) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { innerPage, title, description, image, descriptionPagination } = props;
    const canonicalUrl = appConfig.clientHost + normalizeUrl(router.asPath).split("?")[0];
    const imageUrl = image || `${appConfig.staticUrl}default-og.jpg`;

    const page = getPageFromUrl(router.asPath);
    const titleValue = page > 1 ? title + t("metaPage") + page : innerPage ? t("seoInnerPage") + title : title;
    const descriptionValue = page > 1 && descriptionPagination ? descriptionPagination : description;

    return (
        <Head>
            {/* Basic Meta */}
            <title>{titleValue}</title>
            {descriptionValue && <meta name="description" content={descriptionValue} />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={titleValue} />
            {descriptionValue && <meta property="og:description" content={descriptionValue} />}
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={titleValue} />
            {descriptionValue && <meta name="twitter:description" content={descriptionValue} />}
            <meta name="twitter:image" content={imageUrl} />

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        </Head>
    );
};

export default Seo;
