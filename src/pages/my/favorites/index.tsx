import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IMenu } from "@/services/models/catalog/menu";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { FavoritesIndex } from "@/application/favorites/favoritesIndex";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

const FavoritesPage: NextPage<IMainState> = (props) => {
    const { t } = useTranslation(["favorites"]);
    return (
        <MainStoreProvider {...props}>
            <Layout title={t("pageHeader")} innerWallpaper={true} stickyHeader={true} isMobile={props.isMobile}>
                <FavoritesIndex />
            </Layout>
        </MainStoreProvider>
    );
};

export default FavoritesPage;

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
    try {
        return await addState(context, {
            props: {
                ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                    "common",
                    "favorites",
                    "product",
                ])),
            },
        });
    } catch (error: any) {
        console.error("Error in getServerSideProps:", error);
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }

        context.res.statusCode = statusCode;

        return {
            props: { statusCode: statusCode }, // This will be passed to _error.js
        };
    }
});
