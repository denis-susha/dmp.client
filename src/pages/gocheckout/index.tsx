import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { GocheckoutIndex } from "@/application/gocheckout/gocheckoutIndex";
import { ICartData } from "@/services/models/cart/cartData";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { GocheckoutStoreProvider } from "@/application/gocheckout/stores/gocheckoutStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

export interface IGoCheckoutPageProps extends IMainState {
    cartData: ICartData;
}

const GoCheckoutPage: NextPage<IGoCheckoutPageProps> = (props) => {
    const { t } = useTranslation(["cart"]);

    return (
        <MainStoreProvider {...props}>
            <Layout
                title={t("seoTitleCheckout")}
                innerWallpaper={true}
                stickyHeader={false}
                simpleLayoutPage={true}
                isMobile={props.isMobile}
            >
                <GocheckoutStoreProvider {...props}>
                    <GocheckoutIndex />
                </GocheckoutStoreProvider>
            </Layout>
        </MainStoreProvider>
    );
};

export default GoCheckoutPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    let cartData: ICartData | undefined;
    const mainProps = {} as IMainState;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<ICartData>(`/cart?isCheckout=true&locale=${locale}`).then((data) => (cartData = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.cartData = cartData;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    try {
        return await addState(context, {
            props: {
                ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["common", "cart"])),
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
