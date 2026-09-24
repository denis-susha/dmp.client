export const formatCurrency = (
    value: number,
    currency?: string,
    divisibility: number = 2,
    locale: string = "en-US"
): string => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: divisibility,
        maximumFractionDigits: divisibility,
    }).format(value);
};
