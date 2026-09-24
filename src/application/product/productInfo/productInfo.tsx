import { useCallback, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "../styles";
import { ShortCharacteristics } from "../shortCharacteristics";
import { IProductData } from "@/services/models/product/productData";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { MobilePrice } from "./mobilePrice/mobilePrice";

interface IProductInfoProps {
    productData: IProductData;
    goToDescription?: () => void;
}

export const ProductInfo: FC<IProductInfoProps> = ({ productData, goToDescription }) => {
    const { t } = useTranslation(["product", "common"]);
    const { isMobile } = useMainStore((state) => state);
    const [showFullHdr, setShowFullHdr] = useState<boolean>(productData.product.userFeatures.name.length < 70);

    const handleShowMoreClick = useCallback(() => {
        setShowFullHdr(!showFullHdr);
    }, [showFullHdr]);

    const product = productData.product;

    return (
        <Styled.ProductInfo>
            <Styled.ProductHeading
                $showFull={showFullHdr}
                $isMobile={isMobile}
                onClick={() => !showFullHdr && handleShowMoreClick()}
            >
                <Styled.ProductHdrTitle $showFull={showFullHdr} $isMobile={isMobile} className="tsHeadline550Medium">
                    {product.userFeatures?.name}
                </Styled.ProductHdrTitle>
                {!showFullHdr && (
                    <Styled.ProductHdrTitleMore $isMobile={isMobile}>
                        <Styled.ProductHdrTitleMoreSpan className="tsBodyControl400Small">
                            {t("more", { ns: "common" })}
                        </Styled.ProductHdrTitleMoreSpan>
                    </Styled.ProductHdrTitleMore>
                )}
            </Styled.ProductHeading>
            <Styled.FeedBackRow>
                <div>
                    <Styled.ProductFeedbackLinkReview>
                        <Styled.RatingStarIcon size={16} icon={"rating-star"} viewBox="0 0 16 16" />
                        <Styled.ReviewTitle className="tsBodyControl500Medium">{`${"0.0"} • 0 ${t("reviews")}`}</Styled.ReviewTitle>
                    </Styled.ProductFeedbackLinkReview>
                </div>
                <div>
                    <Styled.ProductFeedbackLinkQuestions>
                        <Styled.QuestionsIcon size={16} icon={"questions"} viewBox="0 0 16 16" />
                        <Styled.ReviewTitle className="tsBodyControl500Medium">{`0 ${t("questions")}`}</Styled.ReviewTitle>
                    </Styled.ProductFeedbackLinkQuestions>
                </div>
            </Styled.FeedBackRow>
            {isMobile && <MobilePrice product={product} />}
            <Styled.AboutProductContainer>
                <Styled.ShortCharacteristics>
                    <Styled.ShortCharacteristicsHdrRow $isMobile={isMobile}>
                        <Styled.AboutProductTitleContainer>
                            <span className="tsHeadline500Medium">{t("aboutProduct")}</span>
                        </Styled.AboutProductTitleContainer>
                        <Styled.LinkToProductDescrContainer onClick={goToDescription}>
                            <Styled.LinkToProductDescrDiv>
                                <Styled.LinkToProductDescrTitle
                                    title={t("goToDescription")}
                                    className="tsBodyControl400Small"
                                >
                                    {t("goToDescription")}
                                </Styled.LinkToProductDescrTitle>
                                <Styled.LinkToProductDescrIcon icon="right-arrow" size={16} />
                                <Styled.LinkToProductDescrBg />
                            </Styled.LinkToProductDescrDiv>
                        </Styled.LinkToProductDescrContainer>
                    </Styled.ShortCharacteristicsHdrRow>
                    <ShortCharacteristics productData={productData} />
                </Styled.ShortCharacteristics>
            </Styled.AboutProductContainer>
        </Styled.ProductInfo>
    );
};
