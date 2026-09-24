/**
 * Removes the pagination segment (/page-N/) that some URLs contain.
 * @param url
 */
export const normalizeUrl = (url: string): string => {
    return (url || "").replace(/\/page-(\d+)\//, "/");
};

export const getPageFromUrl = (url: string): number => {
    const [uri, search] = url.split("?");

    if (uri.indexOf("/page-") !== -1) {
        const match = uri.match(/\/page-(\d+)\/$/);
        return (match ? Number(match[1]) : 0) || 1;
    }

    if (!search) return 1;

    const params = Object.fromEntries(new URLSearchParams(search).entries());

    return Number(params.page) || 1;
};
