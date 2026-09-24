import { type FC } from "react";
import { Styled } from "./productItem.styles";
import { Styled as OrderItemsStyled } from "./orderItems.styles";
import { appConfig } from "@/appConfig";
import { formatCurrency } from "@/utils";
import { CurrencyEnum } from "@/services/models/currencyEnum";
import Link from "next/link";
import { IGetOrderLineResponse } from "@/services/models/order/getOrderLineResponse";
import { Constants } from "../constants";

export interface ProductItemProps {
    item: IGetOrderLineResponse;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
    const { item } = props;

    const productLink = `/product/${item.slug}-${item.productId}`;
    const previewLink =
        appConfig.imagesHost +
        (item.cover ? `/images/product/${item.productId}/original/${item.cover}` : Constants.noImagePath);

    return (
        <Styled.Container>
            <Styled.StoreContainer>
                <span className="tsCompactControl400Small">{item.storeName}</span>
            </Styled.StoreContainer>
            <OrderItemsStyled.RelativeContainer>
                <Styled.ItemContainer>
                    <Link href={productLink} target="_blank">
                        <Styled.ImgContainer>
                            <Styled.Img loading="lazy" fill fetchPriority="low" src={previewLink} alt="productImage" />
                            <Styled.ImgBg />
                        </Styled.ImgContainer>
                    </Link>
                    <Styled.DescriptionCpntainer>
                        <Styled.DescriptionWraper>
                            <Styled.DescriptionColumn>
                                <Styled.DescriptionPriceRow>
                                    <Styled.DescriptionPriceWrapper>
                                        <Styled.DescriptionPriceValue className="tsHeadline400Small">
                                            {formatCurrency(item.price, CurrencyEnum.USD)}
                                        </Styled.DescriptionPriceValue>
                                    </Styled.DescriptionPriceWrapper>
                                </Styled.DescriptionPriceRow>
                                <Styled.DescriptionNameRow>
                                    <Link href={productLink} target="_blank">
                                        <span className="tsCompact500Medium">{item.productName}</span>
                                    </Link>
                                </Styled.DescriptionNameRow>
                                <Styled.DescriptionDetailsRow>
                                    <span className="tsCompact400Small">{item.featuresValues}</span>
                                </Styled.DescriptionDetailsRow>
                            </Styled.DescriptionColumn>
                        </Styled.DescriptionWraper>
                    </Styled.DescriptionCpntainer>
                </Styled.ItemContainer>
            </OrderItemsStyled.RelativeContainer>
        </Styled.Container>
    );
};
