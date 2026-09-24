import Carousel from "@/components/common/Carousel";
import { Layout } from "@/components/layout/Layout";
import { type FC } from "react";
import { Recommendation } from "./recommendation";
import { useHomeZustandStore } from "./stores/homeStoreProvider";
import { appConfig } from "@/appConfig";
import { Styled } from "./home.styles";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { ImageItem } from "@/components/common/ImageGallery/imageGallery";

export interface HomeIndexProps {
    title: string;
    description: string;
}

const images: ImageItem[] = [
    { id: 1, src: `${appConfig.staticUrl}banner/banner_buy.png`, link: "/category", alt: "Banner Buy" },
    { id: 2, src: `${appConfig.staticUrl}banner/banner_sell.png`, link: "/seller", alt: "Banner Sell" },
];

export const HomeIndex: FC<HomeIndexProps> = ({ title, description }) => {
    const { isMobile } = useMainStore((state) => state);
    const { recommendedProducts } = useHomeZustandStore((state) => state);
    return (
        <>
            <Layout title={title} description={description} isMobile={isMobile}>
                <Styled.Page $isMobile={isMobile}>
                    <Styled.Content $isMobile={isMobile}>
                        <Styled.CarouselWrapper $isMobile={isMobile}>
                            <Carousel images={images} isBanner autoPlay autoPlayInterval={5500} isMobile={isMobile} />
                        </Styled.CarouselWrapper>
                    </Styled.Content>
                    {recommendedProducts && recommendedProducts.length > 0 && (
                        <Recommendation recommendedProducts={recommendedProducts} />
                    )}
                </Styled.Page>
            </Layout>
        </>
    );
};
