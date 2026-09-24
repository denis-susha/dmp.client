import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IMenu } from "@/services/models/catalog/menu";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { UserSettingsIndex } from "@/application/userSettings/userSettingsIndex";
import { IUserSettings } from "@/services/models/user/userSettings";
import { UserSettingsStoreProvider } from "@/application/userSettings/stores/userSettingsStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

export interface IUserSettingsPageProps extends IMainState {
    userSettings: IUserSettings;
}

const UserSettingsPage: NextPage<IUserSettingsPageProps> = (props) => {
    const { t } = useTranslation(["settings"]);
    return (
        <MainStoreProvider {...props}>
            <Layout title={t("pageHeader")} innerWallpaper={true} stickyHeader={true} isMobile={props.isMobile}>
                <UserSettingsStoreProvider {...props}>
                    <UserSettingsIndex />
                </UserSettingsStoreProvider>
            </Layout>
        </MainStoreProvider>
    );
};

export default UserSettingsPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const mainProps = {} as IMainState;
    let userSettings = {} as IUserSettings;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi.get<IUserSettings>("/user/settings").then((data) => (userSettings = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.userSettings = userSettings;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    try {
        return await addState(context, {
            props: {
                ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                    "common",
                    "settings",
                    "settings-panel",
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
