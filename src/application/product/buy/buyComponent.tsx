import { FC } from "react";
import { Styled } from "./styles";
import Icon from "@/components/common/Icon";
import Tooltip from "@/components/common/Tooltip";
import { IProduct } from "@/services/models/product/product";
import { formatCurrency } from "@/utils";
import { useTranslation } from "next-i18next/pages";
import { AddToFavoriteComponent } from "../addToFavorite/addToFavoriteComponent";
import { AddToCartComponent } from "./addToCartComponent";

interface IBuyComponentProps {
    product: IProduct;
    onBuyBtnClick: (oneClickBuying: boolean) => void;
}

export const BuyComponent: FC<IBuyComponentProps> = (props) => {
    const { product, onBuyBtnClick } = props;
    const { t } = useTranslation(["product", "common"]);

    return (
        <Styled.ProductBuyColumn>
            <Styled.ProductBuyInfoContainer>
                <Styled.CartPriceContainer>
                    <Styled.CartPriceWrapper>
                        <Styled.CartPriceDiv>
                            <Styled.PriceRow>
                                <div>
                                    <div>
                                        <Styled.PriceDiv>
                                            <Styled.PriceBox>
                                                <Styled.PriceWrapper>
                                                    <Styled.PriceValueWrapper>
                                                        <Styled.PriceValue>
                                                            {formatCurrency(product.price, "USD", 2)}
                                                        </Styled.PriceValue>
                                                    </Styled.PriceValueWrapper>
                                                </Styled.PriceWrapper>
                                                <Styled.PopupWrapper>
                                                    <Tooltip
                                                        content={t("priceTooltip")}
                                                        position="bottom"
                                                        trigger="hover"
                                                        minWidth={264}
                                                        maxWidth={264}
                                                    >
                                                        <Styled.Popup>
                                                            <Icon size={16} icon="info" />
                                                        </Styled.Popup>
                                                    </Tooltip>
                                                </Styled.PopupWrapper>
                                            </Styled.PriceBox>
                                        </Styled.PriceDiv>
                                    </div>
                                </div>
                            </Styled.PriceRow>
                            <Styled.EmptyRow></Styled.EmptyRow>
                            <Styled.AddToCartRow>
                                <div>
                                    <Styled.AddToCartContainer>
                                        <AddToCartComponent onBuyBtnClick={onBuyBtnClick} />
                                        <AddToFavoriteComponent productId={product.productId} />
                                    </Styled.AddToCartContainer>
                                </div>
                            </Styled.AddToCartRow>
                        </Styled.CartPriceDiv>
                    </Styled.CartPriceWrapper>
                </Styled.CartPriceContainer>
                <Styled.BuyInOneClickContainer>
                    <Styled.BuyInOneClickWrapper>
                        <Styled.OneClickButton onClick={() => onBuyBtnClick(true)}>
                            <Styled.OneClickButtonTitleContainer>
                                <Styled.OneClickButtonTitle className="tsBodyControl500Medium">
                                    {t("buyOneClick")}
                                </Styled.OneClickButtonTitle>
                            </Styled.OneClickButtonTitleContainer>
                            <Styled.OneClickButtonBg />
                        </Styled.OneClickButton>
                    </Styled.BuyInOneClickWrapper>
                </Styled.BuyInOneClickContainer>
            </Styled.ProductBuyInfoContainer>
        </Styled.ProductBuyColumn>
    );
};
