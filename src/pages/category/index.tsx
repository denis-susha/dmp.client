import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { CategoryCatalogIndex } from "@/application/category";
import { useTranslation } from "next-i18next/pages";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMenu } from "@/services/models/catalog/menu";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { isMobile } from "@/utils";

const CategoryCatalogNextPage: NextPage<IMainState> = (props) => {
    const { t } = useTranslation(["category", "common"]);
    return (
        <MainStoreProvider {...props}>
            <Layout title={t("seoTitle")} description={t("seoDescr")} isMobile={props.isMobile}>
                <CategoryCatalogIndex
                    categories={props.menu?.categories ?? []}
                    rootName={t("catalog", { ns: "common" })}
                />
            </Layout>
        </MainStoreProvider>
    );
};

export default CategoryCatalogNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["common", "category"])),
        },
    });
});
