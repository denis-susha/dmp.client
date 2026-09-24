import { ICartItem } from "./cartItem";

export interface ICartData {
    items?: ICartItem[];
    unavailableItems?: ICartItem[];
    totalQuantity: number;
    totalAmount: number;
}
