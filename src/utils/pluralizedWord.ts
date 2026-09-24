export const getPluralizedItemWord = (count: number, locale: string): string => {
    if (locale === "ru") {
        if (count % 10 === 1 && count % 100 !== 11) {
            return "товар";
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return "товара";
        } else {
            return "товаров";
        }
    }

    // Default to English for other locales
    return count === 1 ? "product" : "products";
};
