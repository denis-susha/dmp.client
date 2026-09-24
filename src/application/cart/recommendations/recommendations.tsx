import { type FC } from "react";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./recommendations.styles";
import LazyHydrate from "@/components/common/LazyHydrate";
import { ViewedProducts } from "./viewedProducts";
import { FavoritesProducts } from "./favoritesProducts";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks";
import { useMainStore } from "@/contexts/mainStoreProvider";

const CommonRecommendations = dynamic(() => import("./commonRecommendations"), { ssr: false });

export const Recommendations: FC = () => {
    const { isMobile } = useMainStore((state) => state);
    const { ref: commonRecommendationsRef, isInView: commonRecommendationsIsInView } = useInView<HTMLDivElement>();
    const { ref: favoritesProductsRef, isInView: favoritesProductsIsInView } = useInView<HTMLDivElement>();
    const { ref: viewedRef, isInView: viewedIsInView } = useInView<HTMLDivElement>();

    return (
        <Styled.Wallpaper>
            <Grid.Container $isMobile={isMobile}>
                <Grid.Separator $height={isMobile ? 0 : 32} />
                <Grid.Row>
                    <Grid.Column>
                        <div ref={viewedRef}>
                            {viewedIsInView ? (
                                <LazyHydrate whenVisible>{<ViewedProducts />}</LazyHydrate>
                            ) : (
                                <div style={{ height: 500 }}>Loading...</div>
                            )}
                        </div>
                        <div ref={favoritesProductsRef}>
                            {favoritesProductsIsInView ? (
                                <LazyHydrate whenVisible>{<FavoritesProducts />}</LazyHydrate>
                            ) : (
                                <div style={{ height: 500 }}>Loading...</div>
                            )}
                        </div>
                        <div ref={commonRecommendationsRef}>
                            {commonRecommendationsIsInView ? (
                                <LazyHydrate whenVisible>{<CommonRecommendations />}</LazyHydrate>
                            ) : (
                                <div style={{ height: 200 }}>Loading...</div>
                            )}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid.Container>
        </Styled.Wallpaper>
    );
};
