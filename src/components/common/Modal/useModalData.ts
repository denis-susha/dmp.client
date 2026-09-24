import { pageApiService } from "@/services/pageApiService";
import { useState, useEffect } from "react";

const useModalData = <T>(dataKey: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const response: T | null = await pageApiService.getJson("modal." + dataKey);
                if (isMounted) setData(response);
            } catch (err) {
                if (isMounted) setError(err as Error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchData();

        return () => {
            isMounted = false; // Prevent state updates if the component unmounts
        };
    }, [dataKey]);

    return { data, isLoading, error };
};

export default useModalData;
