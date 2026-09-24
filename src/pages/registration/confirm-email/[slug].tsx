import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { ConfirmEmailIndex } from "@/application/registration/confirmEmail";
import { getServerApi } from "@/utils/api/apiAxious";
import { IConfirmEmailResponse } from "@/services/models/registration/confirmEmailResponse";
import { ConfirmEmailStatusEnum } from "@/services/models/registration/confirmEmailStatusEnum";
import { appConfig } from "@/appConfig";
import { isMobile } from "@/utils";
import { AuthPageProps } from "@/pages/login";

export interface IConfirmEmailNextPageProps extends AuthPageProps {
    confirmEmailResult: ConfirmEmailStatusEnum | null;
}

const ConfirmEmailNextPage: NextPage<IConfirmEmailNextPageProps> = (props) => {
    return (
        <Layout title={appConfig.name} authPage={true} showFooter={false}>
            <ConfirmEmailIndex {...props} />
        </Layout>
    );
};

export default ConfirmEmailNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const slug = context.query.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    const host = getHostByContext(context);
    const serverApi = getServerApi(context);

    let confirmEmailResponse = {} as IConfirmEmailResponse;
    await serverApi.get<IConfirmEmailResponse>(`/registration/confirm-email?token=${slug}`).then((data) => {
        confirmEmailResponse = data.data;

        if (confirmEmailResponse.status === ConfirmEmailStatusEnum.Success) {
            // Update the cookie in the response headers
            const { res } = context;
            const setcookie = data.headers["set-cookie"];
            if (setcookie) {
                res.setHeader("Set-Cookie", setcookie);
            }
        }
    });

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.confirmEmailResult = confirmEmailResponse.status;
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
