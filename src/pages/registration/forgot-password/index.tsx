import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { ForgotPasswordIndex } from "@/application/registration/forgotPassword";
import { appConfig } from "@/appConfig";
import { isMobile } from "@/utils";
import { AuthPageProps } from "@/pages/login";

const ForgotPasswordNextPage: NextPage<AuthPageProps> = (props) => {
    return (
        <Layout title={appConfig.name} authPage={true} showFooter={false} isMobile={props.isMobile}>
            <ForgotPasswordIndex {...props} />
        </Layout>
    );
};

export default ForgotPasswordNextPage;

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
