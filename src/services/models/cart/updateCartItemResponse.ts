import { ICartData } from "./cartData";
import { UpdateCartStatusEnum } from "./updateCartStatusEnum";

export interface IUpdateCartItemResponse {
    status: UpdateCartStatusEnum;
    cartData: ICartData;
}
