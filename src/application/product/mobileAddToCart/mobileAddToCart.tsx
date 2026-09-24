import { type FC } from "react";
import { IProductData } from "@/services/models/product/productData";
import { Styled } from "./mobileAddToCart.styles";
import { AddToCartComponent } from "../buy/addToCartComponent";

export interface ProductIndexProps {
    productData: IProductData;
}

export const MobileAddToCart: FC<{ onBuyBtnClick: (oneClickBuying: boolean) => void }> = ({ onBuyBtnClick }) => {
    return (
        <Styled.Container>
            <AddToCartComponent onBuyBtnClick={onBuyBtnClick} />
        </Styled.Container>
    );
};
