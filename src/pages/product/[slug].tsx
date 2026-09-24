import { GetServerSideProps, GetServerSidePropsContext, NextPage, PreviewData } from "next";
import { getHostByContext } from "@/hooks/useSite";
import { ParsedUrlQuery } from "querystring";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Layout } from "@/components/layout/Layout";
import { ProductIndex } from "@/application/product";
import { getServerApi, withAuth } from "@/utils/api/apiAxious";
import { IMenu } from "@/services/models/catalog/menu";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IProductData } from "@/services/models/product/productData";
import { IMainState } from "@/contexts/mainStore";
import { MainStoreProvider } from "@/contexts/mainStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { appConfig } from "@/appConfig";
import { Constants } from "@/application/constants";
import { isMobile } from "@/utils";

interface IProductNextPageProps extends IMainState {
    productData: IProductData;
}

const ProductNextPage: NextPage<IProductNextPageProps> = (props) => {
    const { t } = useTranslation(["product"]);
    return (
        <MainStoreProvider {...props}>
            <Layout
                title={t("seoTitle", {
                    name: props.productData.product.userFeatures.name,
                    id: props.productData.product.productId,
                })}
                description={t("seoDescr", {
                    name: props.productData.product.userFeatures.name,
                    id: props.productData.product.productId,
                })}
                image={
                    props.productData.product.imgLinks
                        ? `${appConfig.imagesHost}/images/product/${props.productData.product.productId}/original/${props.productData.product.imgLinks[0]}`
                        : `${appConfig.imagesHost}${Constants.noImagePath}`
                }
                isMobile={props.isMobile}
                isMobileWithFixedContainer
            >
                <ProductIndex productData={props.productData} />
            </Layout>
        </MainStoreProvider>
    );
};

export default ProductNextPage;

export async function addState(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, pageProps: any) {
    const serverApi = getServerApi(context);
    const host = getHostByContext(context);
    const { locale } = context;

    const slug = context.query.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    let productData: IProductData | undefined;
    const mainProps = {} as IMainState;
    await Promise.all([
        serverApi.get<IUserInfo>("/user/").then((data) => (mainProps.userInfo = data.data)),
        serverApi.get<IMenu>(`/catalog/menu?menuId=${1}&locale=${locale}`).then((data) => (mainProps.menu = data.data)),
        serverApi
            .get<IProductData>(`/product/product?product=${slug}&locale=${locale}`)
            .then((data) => (productData = data.data)),
    ]);

    if (pageProps?.props) {
        pageProps.props.host = host;
        pageProps.props.userInfo = mainProps.userInfo;
        pageProps.props.menu = mainProps.menu;
        pageProps.props.productData = productData;
        pageProps.props.isMobile = isMobile(context.req.headers);
    }

    return pageProps;
}

export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
    return await addState(context, {
        props: {
            ...(await serverSideTranslations(context.locale || context.defaultLocale || "en", ["common", "product"])),
        },
    });
});
