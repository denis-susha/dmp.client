import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./gocheckout.styles";
import { appConfig } from "@/appConfig";
import { Constants } from "../constants";
import { ICartItem } from "@/services/models/cart/cartItem";

export interface GocheckoutItemProps {
    item: ICartItem;
}

export const GocheckoutItem: FC<GocheckoutItemProps> = (props) => {
    const { item } = props;
    const { t } = useTranslation(["cart"]);

    const price = (item.quantity ?? 0) > 1 ? `${item.price} USD/${t("pcs")}` : `${item.price} USD`;
    const previewLink =
        appConfig.imagesHost +
        (item.imgLink ? `/images/product/${item.productId}/original/${item.imgLink}` : Constants.noImagePath);

    return (
        <Styled.Item>
            <Styled.ItemImgContainer>
                <Styled.ItemImg loading="lazy" width={92} height={92} src={previewLink} alt={item.name} />
                {(item.quantity ?? 0) > 1 && (
                    <Styled.ItemQuantity>
                        <Styled.ItemQuantityContainer>
                            <Styled.ItemQuantityText className="tsBodyControl300XSmall">{`${item.quantity} ${t("pcs")}`}</Styled.ItemQuantityText>
                        </Styled.ItemQuantityContainer>
                    </Styled.ItemQuantity>
                )}
            </Styled.ItemImgContainer>
            <Styled.ItemPriceContainer>
                <Styled.ItemPriceWrapper>
                    <span className="tsCompact400Large">{price}</span>
                </Styled.ItemPriceWrapper>
            </Styled.ItemPriceContainer>
        </Styled.Item>
    );
};
