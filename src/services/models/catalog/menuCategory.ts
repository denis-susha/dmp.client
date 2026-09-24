import { ICategoryFeature } from "./categoryFeature";

export interface IMenuCategory {
    menuCategoryId: number;
    menuId?: number;
    title: string;
    parentId?: number;
    children?: IMenuCategory[];
    order?: number;
    url: string;
    parent?: IMenuCategory;
    features?: ICategoryFeature[];
}
