import { FC } from "react";
import { Styled } from "./searchBar.styles";
import { appConfig } from "@/appConfig";
import { CurrencyEnum } from "@/services/models/currencyEnum";
import { formatCurrency } from "@/utils";
import { IProduct } from "@/services/models/product/product";
import { Constants } from "@/application/constants";

interface ISearchProductProps {
    product: IProduct;
}

export const SearchProduct: FC<ISearchProductProps> = (props) => {
    const { product } = props;

    const onClick = () => {
        window.location.assign(`/product/${product.slug}-${product.productId}`);
    };

    const previewLink =
        appConfig.imagesHost +
        (product.imgLinks
            ? `/images/product/${product.productId}/original/${product.imgLinks[0]}`
            : Constants.noImagePath);

    return (
        <Styled.Container>
            <Styled.RelativeContainer>
                <Styled.ItemContainer onClick={onClick}>
                    <Styled.ImgContainer>
                        <Styled.Img loading="lazy" fill fetchPriority="low" src={previewLink} alt="productImage" />
                        <Styled.ImgBg />
                    </Styled.ImgContainer>
                    <Styled.DescriptionCpntainer>
                        <Styled.DescriptionWraper>
                            <Styled.DescriptionColumn>
                                <Styled.DescriptionPriceRow>
                                    <Styled.DescriptionPriceWrapper>
                                        <Styled.DescriptionPriceValue className="tsHeadline400Small">
                                            {formatCurrency(product.price, CurrencyEnum.USD)}
                                        </Styled.DescriptionPriceValue>
                                    </Styled.DescriptionPriceWrapper>
                                </Styled.DescriptionPriceRow>
                                <Styled.DescriptionNameRow>
                                    <span className="tsCompact500Medium">{product.userFeatures?.name}</span>
                                </Styled.DescriptionNameRow>
                                <Styled.DescriptionDetailsRow>
                                    <span className="tsCompact400Small">{`${product.features ? product.features.map((f) => f.value).join(", ") : ""}`}</span>
                                </Styled.DescriptionDetailsRow>
                            </Styled.DescriptionColumn>
                        </Styled.DescriptionWraper>
                    </Styled.DescriptionCpntainer>
                </Styled.ItemContainer>
            </Styled.RelativeContainer>
        </Styled.Container>
    );
};
