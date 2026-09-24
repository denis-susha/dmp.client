import { appConfig } from "@/appConfig";
import { FullPageOverlay } from "@/components/common/ImageGallery/fullPageOverlay";
import { ImageGallery, ImageItem } from "@/components/common/ImageGallery/imageGallery";
import { IProduct } from "@/services/models/product/product";
import React, { FC, useState } from "react";
import { Constants } from "../constants";
import Carousel from "@/components/common/Carousel";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { Styled } from "./styles";

export const ProductGallery: FC<{ product: IProduct }> = ({ product }) => {
    const { isMobile } = useMainStore((state) => state);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const images: ImageItem[] =
        product.imgLinks?.map((link, index) => ({
            id: index,
            src: `${appConfig.imagesHost}/images/product/${product.productId}/original/${link}`,
            alt: product.userFeatures?.name ?? "",
        })) || [];

    if (product.imgLinks?.length === 0) {
        images.push({
            id: 0,
            src: `${appConfig.imagesHost}${Constants.noImagePath}`,
            alt: product.userFeatures?.name ?? "",
        });
    }

    return (
        <>
            {isMobile ? (
                <Styled.ProductVisualInfoColumnCarousel>
                    <Carousel
                        isBanner={false}
                        autoPlay={false}
                        images={images}
                        isMobile={true}
                        setActiveIndex={setActiveIndex}
                    />
                </Styled.ProductVisualInfoColumnCarousel>
            ) : (
                <ImageGallery images={images} setActiveIndex={setActiveIndex} />
            )}
            {activeIndex !== null && (
                <FullPageOverlay images={images} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} />
            )}
        </>
    );
};
