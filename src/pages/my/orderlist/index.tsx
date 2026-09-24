import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IMenu } from "@/services/models/catalog/menu";
import { ITableQuery } from "@/services/models/tableQuery";
import { OrderListIndex } from "@/application/orderList/orderListIndex";
import { IGetOrderListResponse } from "@/services/models/order/getOrderListResponse";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { OrderListStoreProvider } from "@/application/orderList/stores/orderListStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

export interface IOrderListPageProps extends IMainState {
    orderResponse: IGetOrderListResponse;
    request: ITableQuery;
}

const OrderListPage: NextPage<IOrderListPageProps> = (props) => {
    const { t } = useTranslation(["order"]);
    return (
        <MainStoreProvider {...props}>
            <Layout title={t("pageHeader")} innerWallpaper={true} stickyHeader={true} isMobile={props.isMobile}>
                <OrderListStoreProvider {...props}>
                    <OrderListIndex />
                </OrderListStoreProvider>
            </Layout>
        </MainStoreProvider>
    );
};

export default OrderListPage;

export async function addState(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    pageProps: any,
    request: ITableQuery
) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    let orderResponse = {} as IGetOrderListResponse;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi.post<IGetOrderListResponse>(`/order/list`, request).then((data) => (orderResponse = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.orderResponse = orderResponse;
        pageProps.props.request = request;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    let page = 1;
    if (context.query && context.query.page) {
        page = Number(context.query.page);
    }

    const request = {
        pagination: { page: page, pageSize: 10 },
    } as ITableQuery;

    try {
        return await addState(
            context,
            {
                props: {
                    ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                        "common",
                        "order",
                        "settings-panel",
                    ])),
                },
            },
            request
        );
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
