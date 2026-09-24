import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { OrderDetailsIndex } from "@/application/orderDetails/orderDetailsIndex";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IGetOrderResponse } from "@/services/models/order/getOrderResponse";
import { IMenu } from "@/services/models/catalog/menu";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { OrderDetailsStoreProvider } from "@/application/orderDetails/stores/orderDetailsStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

export interface IOrderDetailsPageProps extends IMainState {
    order: IGetOrderResponse;
}

const OrderDetailsPage: NextPage<IOrderDetailsPageProps> = (props) => {
    const { t } = useTranslation(["order"]);
    return (
        <MainStoreProvider {...props}>
            <Layout title={t("pageHeader")} innerWallpaper={true} stickyHeader={true} isMobile={props.isMobile}>
                <OrderDetailsStoreProvider {...props}>
                    <OrderDetailsIndex />
                </OrderDetailsStoreProvider>
            </Layout>
        </MainStoreProvider>
    );
};

export default OrderDetailsPage;

export async function addState(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    orderId: number,
    pageProps: any
) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    let getOrderResponse = {} as IGetOrderResponse;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi
            .get<IGetOrderResponse>(`/order?orderId=${orderId}&locale=${locale}`)
            .then((data) => (getOrderResponse = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.order = getOrderResponse;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    let orderId;
    if (context.query && context.query.order) {
        orderId = Number(context.query.order);
    }

    if (!orderId) {
        return {
            redirect: {
                destination: "/my/orderlist",
                permanent: false,
            },
        };
    }

    try {
        return await addState(context, orderId, {
            props: {
                ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["common", "order"])),
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
