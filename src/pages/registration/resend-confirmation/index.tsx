import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { ResendConfirmationIndex } from "@/application/registration/resendConfirmation";
import { appConfig } from "@/appConfig";
import { AuthPageProps } from "@/pages/login";
import { isMobile } from "@/utils";

const ResendConfirmationNextPage: NextPage<AuthPageProps> = (props) => {
    return (
        <Layout title={appConfig.name} authPage={true} showFooter={false} isMobile={props.isMobile}>
            <ResendConfirmationIndex {...props} />
        </Layout>
    );
};

export default ResendConfirmationNextPage;

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
