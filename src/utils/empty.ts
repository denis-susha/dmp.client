export function empty<T>(value: T | null | undefined): value is null | undefined {
    // false, null, undefined, 0, ''
    if (!value) return true;

    // An array is empty when it has no elements ([])
    if (Array.isArray(value)) return value.length === 0;

    // An object is empty when it has no own keys ({})
    if (typeof value === "object") return Object.keys(value).length === 0;

    // Any other truthy value ('foo', 100, -100) is not empty
    return !value;
}
