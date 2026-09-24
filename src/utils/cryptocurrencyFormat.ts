export const cryptocurrencyFormat = (value: number, currency?: string, divisibility: number = 2): string => {
    return `${value.toFixed(divisibility)} ${currency || ""}`;
};
