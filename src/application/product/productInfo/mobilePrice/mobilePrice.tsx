import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./mobilePrice.styles";
import { Styled as BuyStyled } from "../../buy/styles";
import { IProduct } from "@/services/models/product/product";
import Tooltip from "@/components/common/Tooltip";
import Icon from "@/components/common/Icon";
import { formatCurrency } from "@/utils";

interface IProductInfoProps {
    product: IProduct;
}

export const MobilePrice: FC<IProductInfoProps> = ({ product }) => {
    const { t } = useTranslation(["product", "common"]);

    return (
        <Styled.Container>
            <Styled.PriceContainer>
                <Styled.PriceWrapper>
                    <BuyStyled.PriceBox>
                        <BuyStyled.PriceWrapper>
                            <BuyStyled.PriceValueWrapper>
                                <BuyStyled.PriceValue>{formatCurrency(product.price, "USD", 2)}</BuyStyled.PriceValue>
                            </BuyStyled.PriceValueWrapper>
                        </BuyStyled.PriceWrapper>
                        <BuyStyled.PopupWrapper>
                            <Tooltip
                                content={t("priceTooltip")}
                                position="bottom"
                                trigger="hover"
                                minWidth={264}
                                maxWidth={264}
                            >
                                <BuyStyled.Popup>
                                    <Icon size={16} icon="info" />
                                </BuyStyled.Popup>
                            </Tooltip>
                        </BuyStyled.PopupWrapper>
                    </BuyStyled.PriceBox>
                </Styled.PriceWrapper>
            </Styled.PriceContainer>
        </Styled.Container>
    );
};
