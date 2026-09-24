import { IMenuCategory } from "./menuCategory";

export interface IMenu {
    menuId: number;
    categories?: IMenuCategory[];
}
