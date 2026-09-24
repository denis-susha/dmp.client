import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./cartOrder.styles";
import Button from "@/components/common/Button";
import Annotation from "@/components/common/Annotation";
import Spinner from "@/components/common/Spinner";
import { ICartData } from "@/services/models/cart/cartData";
import { getPluralizedItemWord } from "@/utils";
import Link from "next/link";

export interface CartOrderProps {
    isOrder: boolean;
    cartData: ICartData;
    onBtnClick: () => void;
}

export const CartOrder: FC<CartOrderProps> = (props) => {
    const { cartData, isOrder, onBtnClick } = props;
    const { t, i18n } = useTranslation(["cart"]);
    const disabled = cartData.totalQuantity === 0;

    const btnTitle = isOrder ? t("pay") : t("goToCheckout");
    const btnFooterTitle = isOrder ? (
        <>
            {t("salesTermsBtnTitle")}
            <Link href="/help#terms-sales" target="_blank">
                {t("salesTermsLinkTitle")}
            </Link>
        </>
    ) : (
        <>{t("summaryTitle")}</>
    );
    const summaryHdrTitle = isOrder ? t("yourOrder") : t("yourCart");
    const summaryValueTitle = isOrder ? t("total") : t("totalCost");

    return (
        <>
            {!cartData && <Spinner />}
            <Styled.StickyContainer>
                <Styled.Section>
                    <Styled.CartOrderContainer>
                        <Styled.CartOrderWrapper>
                            <Button
                                disabled={disabled}
                                onClick={onBtnClick}
                                bgColor={isOrder ? undefined : "rgb(16, 196, 76)"}
                            >
                                <Styled.BtnOrderInnerContainer>
                                    <Styled.BtnOrderInnerTitle disabled={disabled} className="tsBodyControl500Medium">
                                        {btnTitle}
                                    </Styled.BtnOrderInnerTitle>
                                </Styled.BtnOrderInnerContainer>
                                <Styled.BtnOrderInnerBg disabled={disabled} />
                            </Button>
                            {!disabled && (
                                <Styled.OrderBtnFooter>
                                    <Styled.OrderBtnFooterContainer>
                                        <Styled.OrderBtnFooterWrapper>
                                            <Styled.OrderBtnFooterBox>
                                                <Styled.OrderBtnFooterTitle>
                                                    {btnFooterTitle}
                                                </Styled.OrderBtnFooterTitle>
                                            </Styled.OrderBtnFooterBox>
                                        </Styled.OrderBtnFooterWrapper>
                                    </Styled.OrderBtnFooterContainer>
                                </Styled.OrderBtnFooter>
                            )}
                            {disabled && (
                                <Styled.AnnotationContainer>
                                    <Annotation style="disabled">
                                        <div>
                                            <Styled.AnnotationContent className="tsBody400Small">
                                                {t("needSelectProducts")}
                                            </Styled.AnnotationContent>
                                        </div>
                                    </Annotation>
                                </Styled.AnnotationContainer>
                            )}
                        </Styled.CartOrderWrapper>
                        {!disabled && (
                            <Styled.Summary>
                                <Styled.SummaryHdrRow>
                                    <Styled.SummaryHdrTitle>{summaryHdrTitle}</Styled.SummaryHdrTitle>
                                    <Styled.SummaryHdrInfo>{`${cartData.totalQuantity} ${getPluralizedItemWord(cartData.totalQuantity, i18n.language)}`}</Styled.SummaryHdrInfo>
                                </Styled.SummaryHdrRow>
                                <Styled.SummaryItemsRow>
                                    <Styled.SummaryItemsTitleContainer>
                                        <Styled.SummaryItemsTitle>
                                            <span>{`${t("products")} (${cartData.totalQuantity})`}</span>
                                        </Styled.SummaryItemsTitle>
                                    </Styled.SummaryItemsTitleContainer>
                                    <div>
                                        <Styled.SummaryItemsValue>{`${cartData.totalAmount} USD`}</Styled.SummaryItemsValue>
                                    </div>
                                </Styled.SummaryItemsRow>
                                <Styled.SummaryValueRow>
                                    <span>{summaryValueTitle}</span>
                                    <span>{`${cartData.totalAmount} USD`}</span>
                                </Styled.SummaryValueRow>
                            </Styled.Summary>
                        )}
                    </Styled.CartOrderContainer>
                </Styled.Section>
            </Styled.StickyContainer>
        </>
    );
};
