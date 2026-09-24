export interface ICartItem {
    productId: number;
    quantity: number | null;
    selected: boolean;
    price: number;
    amount: number;
    name: string;
    slug: string;
    imgLink?: string;
    featuresValues: string;
}
