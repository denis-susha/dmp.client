import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import BlogArticlePage from "@/application/blog/article";
import Seo from "@/components/common/Seo";
import { useTranslation } from "next-i18next/pages";
import { ParsedUrlQuery } from "querystring";
import { getServerApi } from "@/utils/api/apiAxious";
import { getHostByContext } from "@/hooks/useSite";
import { IBlogPost } from "@/services/models/blog/blogPost";
import { AppNotificationStoreProvider } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import NotificationComponent from "@/components/common/Notification";
import { appConfig } from "@/appConfig";

export interface IBlogArticleNextPageProps {
    post: IBlogPost;
}

const BlogArticleNextPage: NextPage<IBlogArticleNextPageProps> = (props) => {
    const { t } = useTranslation(["blog"]);
    return (
        <>
            <Seo
                innerPage={false}
                title={`${props.post.attributes?.metaTitle} | ${t("seoTitle")}`}
                description={props.post.attributes?.metaDescription}
                image={`${appConfig.staticUrl}${props.post.coverPath}`}
            />
            <AppNotificationStoreProvider>
                <BlogArticlePage {...props} />
                <NotificationComponent />
            </AppNotificationStoreProvider>
        </>
    );
};

export default BlogArticleNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const { locale } = context;
    const slug = context.query.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    const serverApi = getServerApi(context);
    const host = getHostByContext(context);

    let post = {} as IBlogPost;
    await Promise.all([
        serverApi.get<IBlogPost>(`/blog/post?slug=${slug}&locale=${locale}`).then((data) => (post = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.post = post;
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
