import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { CategoryProductsIndex } from "@/application/categoryProducts";
import { ICategoryDataRequest } from "@/services/models/catalog/categoryDataRequest";
import { IMenuCategoryData } from "@/services/models/catalog/menuCategoryData";
import { useEffect, useState } from "react";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMenu } from "@/services/models/catalog/menu";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { IMainState } from "@/contexts/mainStore";
import { useTranslation } from "next-i18next/pages";
import { isMobile } from "@/utils";

interface ICategoryNextPageProps extends IMainState {
    withFilters: boolean;
    menuCategoryData?: IMenuCategoryData;
    currentPage: number;
}

const CategoryNextPage: NextPage<ICategoryNextPageProps> = (props) => {
    const { t } = useTranslation(["category-data"]);
    const [categoryData, setCategoryData] = useState<IMenuCategoryData | undefined>(undefined);

    useEffect(() => {
        if (!props.menuCategoryData) {
            return;
        }

        setCategoryData(props.menuCategoryData);
    }, [props.menuCategoryData]);

    if (!categoryData) {
        return null;
    }

    return (
        <MainStoreProvider {...props}>
            <Layout
                title={t("seoTitle", { category: props.menuCategoryData?.category.title })}
                description={t("seoDescr")}
                isMobile={props.isMobile}
            >
                <CategoryProductsIndex
                    categoryData={categoryData}
                    withFilters={props.withFilters}
                    currentPage={props.currentPage}
                />
            </Layout>
        </MainStoreProvider>
    );
};

export default CategoryNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const slug = context.query.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    const page = parseInt(context.query.page as string) || 1;

    const featureFilters: Record<string, string> = {};
    const separatorIdx = context.resolvedUrl.indexOf("?");
    if (separatorIdx != -1) {
        const queryString = context.resolvedUrl.substring(separatorIdx + 1);
        const params = new URLSearchParams(queryString);
        params.forEach((value, key) => {
            featureFilters[key] = value;
        });
    }

    const filters: ICategoryDataRequest = {
        category: slug,
        page: page,
        filters: featureFilters,
    };

    let menuCategoryData: IMenuCategoryData | undefined;

    const mainProps = {} as IMainState;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi
            .post<IMenuCategoryData>(`/catalog/categorydata?locale=${locale}`, filters)
            .then((data) => (menuCategoryData = data.data)),
    ]);

    if (!menuCategoryData || !menuCategoryData.category) {
        return { notFound: true };
    }

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.withFilters = Object.keys(featureFilters).length !== 0;
        pageProps.props.menuCategoryData = menuCategoryData;
        pageProps.props.currentPage = page;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", [
                "common",
                "product",
                "category-data",
            ])),
        },
    });
});
