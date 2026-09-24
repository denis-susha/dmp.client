import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMenu } from "@/services/models/catalog/menu";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { IMainState } from "@/contexts/mainStore";
import { useTranslation } from "next-i18next/pages";
import { IFullTextSearchProductsRequest } from "@/services/models/search/fullTextSearchProductsRequest";
import { IFullTextSearchResponse } from "@/services/models/search/fullTextSearchResponse";
import { SearchIndex } from "@/application/search";
import { isMobile } from "@/utils";

export interface ISearchNextPageProps extends IMainState {
    searchData: IFullTextSearchResponse;
    query: string;
    currentPage: number;
}

const SearchNextPage: NextPage<ISearchNextPageProps> = (props) => {
    const { t } = useTranslation(["search"]);
    const [searchData, setSearchData] = useState<IFullTextSearchResponse | undefined>(undefined);

    useEffect(() => {
        if (!props.searchData) {
            return;
        }

        setSearchData(props.searchData);
    }, [props.searchData]);

    if (!searchData) {
        return null;
    }

    return (
        <MainStoreProvider {...props}>
            <Layout
                title={t("seoTitle", { query: props.query })}
                description={t("seoDescr", { query: props.query })}
                isMobile={props.isMobile}
            >
                <SearchIndex {...props} />
            </Layout>
        </MainStoreProvider>
    );
};

export default SearchNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const query = context.query.query as string;

    if (!query) {
        return { notFound: true };
    }

    const page = parseInt(context.query.page as string) || 1;
    const request: IFullTextSearchProductsRequest = { query: query, pagination: { page: page, pageSize: 20 } };

    let searchData: IFullTextSearchResponse | undefined;

    const mainProps = {} as IMainState;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi
            .post<IFullTextSearchResponse>(`/product/search-products?locale=${locale}`, request)
            .then((data) => (searchData = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.searchData = searchData;
        pageProps.props.query = query;
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
                "search",
                "product",
            ])),
        },
    });
});
