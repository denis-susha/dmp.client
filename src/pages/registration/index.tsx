import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { RegistrationIndex } from "@/application/registration";
import { RegistrationStoreProvider } from "@/application/registration/stores/registrationStoreProvider";
import { appConfig } from "@/appConfig";
import { AuthPageProps } from "../login";
import { isMobile } from "@/utils";

const RegistrationNextPage: NextPage<AuthPageProps> = (props) => {
    return (
        <Layout title={appConfig.name} authPage={true} showFooter={false} isMobile={props.isMobile}>
            <RegistrationStoreProvider>
                <RegistrationIndex {...props} />
            </RegistrationStoreProvider>
        </Layout>
    );
};

export default RegistrationNextPage;

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
