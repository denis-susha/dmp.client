import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { HelpPage } from "@/application/help";
import Seo from "@/components/common/Seo";
import { useTranslation } from "next-i18next/pages";

const HelpNextPage: NextPage = () => {
    const { t } = useTranslation(["help"]);
    return (
        <>
            <Seo innerPage={false} title={t("seoTitle")} description={t("seoDescr")} />
            <HelpPage />
        </>
    );
};

export default HelpNextPage;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["help"])),
            host: "filezon.com",
        },
    };
};
