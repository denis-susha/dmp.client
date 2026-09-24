export const getHostByContext = ({ req }: any): string => {
    return process.env.NEXT_PUBLIC_HOST || req.headers.host || "";
};
