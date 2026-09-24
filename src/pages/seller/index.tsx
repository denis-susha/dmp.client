import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import SellerPage from "@/application/seller";
import Seo from "@/components/common/Seo";
import { useTranslation } from "next-i18next/pages";
import { AppNotificationStoreProvider } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import NotificationComponent from "@/components/common/Notification";

const SellerNextPage: NextPage = () => {
    const { t } = useTranslation(["seller"]);
    return (
        <>
            <Seo innerPage={false} title={t("seoTitle")} description={t("seoDescr")} />
            <AppNotificationStoreProvider>
                <SellerPage />
                <NotificationComponent />
            </AppNotificationStoreProvider>
        </>
    );
};

export default SellerNextPage;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["seller", "common"])),
            host: "filezon.com",
        },
    };
};
