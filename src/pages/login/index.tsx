import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import LoginPage from "@/application/login";
import { LoginStoreProvider } from "@/application/login/stores/loginStoreProvider";
import { appConfig } from "@/appConfig";
import { isMobile } from "@/utils";

export type AuthPageProps = {
    isMobile: boolean;
};

const LoginNextPage: NextPage<AuthPageProps> = (props) => {
    return (
        <Layout title={appConfig.name} authPage={true} showFooter={false} isMobile={props.isMobile}>
            <LoginStoreProvider>
                <LoginPage isMobile={props.isMobile} />
            </LoginStoreProvider>
        </Layout>
    );
};

export default LoginNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const host = getHostByContext(context);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                "registration",
                "common",
            ])),
        },
    });
};
