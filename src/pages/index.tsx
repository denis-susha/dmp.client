import { HomeIndex } from "../application/home";
import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IMenu } from "@/services/models/catalog/menu";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IProduct } from "@/services/models/product/product";
import { HomeZustandStoreProvider } from "@/application/home/stores/homeStoreProvider";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { IMainState } from "@/contexts/mainStore";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "../utils";

export interface IHomeNextPageProps extends IMainState {
    recommendedProducts: IProduct[];
}

const HomeNextPage: NextPage<IHomeNextPageProps> = (props) => {
    const { t } = useTranslation(["home"]);
    return (
        <MainStoreProvider {...props}>
            <HomeZustandStoreProvider {...props}>
                <HomeIndex title={t("seoTitle")} description={t("seoDescr")} />
            </HomeZustandStoreProvider>
        </MainStoreProvider>
    );
};

export default HomeNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    let recommendedProducts: IProduct[] | undefined;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi.get<IProduct[]>("/catalog/recommendation").then((data) => (recommendedProducts = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.host = host;
        pageProps.props.recommendedProducts = recommendedProducts;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                "common",
                "product",
                "home",
            ])),
        },
    });
});
