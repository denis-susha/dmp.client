import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { ResetPasswordIndex } from "@/application/registration/resetPassword";
import { appConfig } from "@/appConfig";
import { AuthPageProps } from "@/pages/login";
import { isMobile } from "@/utils";

export interface IForgotPasswordNextPageProps extends AuthPageProps {
    token: string;
}

const ResetPasswordNextPage: NextPage<IForgotPasswordNextPageProps> = (props) => {
    return (
        <Layout title={appConfig.name} authPage={true} showFooter={false} isMobile={props.isMobile}>
            <ResetPasswordIndex {...props} />
        </Layout>
    );
};

export default ResetPasswordNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const slug = context.query.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    const host = getHostByContext(context);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.token = slug;
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
