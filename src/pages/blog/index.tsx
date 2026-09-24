import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import BlogPage from "@/application/blog";
import Seo from "@/components/common/Seo";
import { useTranslation } from "next-i18next/pages";
import { getServerApi } from "@/utils/api/apiAxious";
import { ParsedUrlQuery } from "querystring";
import { getHostByContext } from "@/hooks/useSite";
import { IBlogPost } from "@/services/models/blog/blogPost";
import { AppNotificationStoreProvider } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import NotificationComponent from "@/components/common/Notification";

export interface IBlogNextPageProps {
    posts: IBlogPost[];
}

const BlogNextPage: NextPage<IBlogNextPageProps> = (props) => {
    const { t } = useTranslation(["blog"]);
    return (
        <>
            <Seo innerPage={false} title={t("seoTitle")} />
            <AppNotificationStoreProvider>
                <BlogPage {...props} />
                <NotificationComponent />
            </AppNotificationStoreProvider>
        </>
    );
};

export default BlogNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    let posts = {} as IBlogPost[];
    await Promise.all([serverApi.get<IBlogPost[]>(`/blog?locale=${locale}`).then((data) => (posts = data.data))]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.posts = posts;
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["common", "blog"])),
        },
    });
};
