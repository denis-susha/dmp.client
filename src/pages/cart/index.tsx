import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { CartIndex } from "@/application/cart/cartIndex";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMenu } from "@/services/models/catalog/menu";
import { ICartData } from "@/services/models/cart/cartData";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { CartStoreProvider } from "@/application/cart/stores/cartStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

export interface ICartNextPageProps extends IMainState {
    cartData: ICartData;
}

const CartNextPage: NextPage<ICartNextPageProps> = (props) => {
    const { t } = useTranslation("cart");

    return (
        <MainStoreProvider {...props}>
            <Layout title={t("seoTitle")} innerWallpaper={true} stickyHeader={false} isMobile={props.isMobile}>
                <CartStoreProvider {...props}>
                    <CartIndex />
                </CartStoreProvider>
            </Layout>
        </MainStoreProvider>
    );
};

export default CartNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    let cartData: ICartData | undefined;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi.get<ICartData>(`/cart?locale=${locale}`).then((data) => (cartData = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.cartData = cartData;
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
                    "cart",
                    "product",
                ])),
            },
        });
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        context.res.statusCode = 500;
        return {
            props: { statusCode: 500 }, // This will be passed to _error.js
        };
    }
});
