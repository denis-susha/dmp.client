import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { PaymantIndex } from "@/application/payment/paymentIndex";
import { PaymentStatusEnum } from "@/services/models/paymentStatusEnum";
import { IGetPaymentResponse } from "@/services/models/order/getPaymentResponse";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { PaymentStoreProvider } from "@/application/payment/stores/paymentStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

export interface IPaymentPageProps extends IMainState {
    payment: IGetPaymentResponse;
}

const PaymentPage: NextPage<IPaymentPageProps> = (props) => {
    const { t } = useTranslation(["payment"]);
    return (
        <MainStoreProvider {...props}>
            <Layout
                title={t("seoTitle")}
                innerWallpaper={true}
                stickyHeader={false}
                simpleLayoutPage={true}
                isMobile={props.isMobile}
            >
                <PaymentStoreProvider {...props}>
                    <PaymantIndex />
                </PaymentStoreProvider>
            </Layout>
        </MainStoreProvider>
    );
};

export default PaymentPage;

export async function addState(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    orderId: number,
    pageProps: any
) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);

    const mainProps = {} as IMainState;
    let payment: IGetPaymentResponse | undefined;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IGetPaymentResponse>(`/order/payment?orderId=${orderId}`).then((data) => {
            payment = data.data;
        }),
    ]);

    if (payment?.status !== PaymentStatusEnum.InProgress) {
        return {
            redirect: {
                destination: `/my/orderdetails?order=${payment?.orderId}`,
                permanent: false,
            },
        };
    }

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.payment = payment;
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
                destination: "/cart",
                permanent: false,
            },
        };
    }

    try {
        return await addState(context, orderId, {
            props: {
                ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                    "common",
                    "payment",
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
