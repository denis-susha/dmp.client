import NotFound from "@/components/common/NotFound/notFound";
import { Layout } from "@/components/layout/Layout";
import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IMenu } from "@/services/models/catalog/menu";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { IMainState } from "@/contexts/mainStore";
import { useTranslation } from "next-i18next/pages";
import { default as ErrorDefault } from "next/error";
import InternalServerError from "@/components/common/NotFound/internalServerError";

export interface IHomeNextPageProps extends IMainState {
    statusCode: number;
}

const ErrorNextPage: NextPage<IHomeNextPageProps> = (props) => {
    const { t } = useTranslation(["error"]);

    switch (props.statusCode) {
        case 404:
            return (
                <MainStoreProvider {...props}>
                    <Layout title={"404"} description={t("notFoundHdr")} innerWallpaper>
                        <NotFound />
                    </Layout>
                </MainStoreProvider>
            );
        case 500:
            return (
                <MainStoreProvider {...props}>
                    <Layout title={"500 Server Error"} description={t("serverError")} innerWallpaper simpleLayoutPage>
                        <InternalServerError />
                    </Layout>
                </MainStoreProvider>
            );
        default:
            return <ErrorDefault statusCode={props.statusCode} />;
    }
};

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
    ]);

    const statusCode = context.res?.statusCode ?? 404;

    if (pageProps?.props) {
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.statusCode = statusCode;
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["error", "common"])),
            host: context.req.headers.host || "",
        },
    });
});

export default ErrorNextPage;
