import { useEffect, useState, type FC } from "react";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { IProduct } from "@/services/models/product/product";
import { fetchData } from "@/utils/api/apiAxious";
import { Recommendation } from "@/application/home/recommendation";
import { useTranslation } from "next-i18next/pages";

export const Recommendations: FC<{ categoryId: string }> = ({ categoryId }) => {
    const { t } = useTranslation(["common"]);
    const { addNotification } = useAppNotificationStore((state) => state);
    const [products, setProducts] = useState<IProduct[] | null>(null);

    useEffect(() => {
        const getRecommendationByCategory = async () => {
            const result = await fetchData<IProduct[]>(`/catalog/category-recommendation?categoryId=${categoryId}`);
            return result;
        };

        getRecommendationByCategory()
            .then((result) => {
                setProducts(result);
            })
            .catch((error) => {
                console.log(error);
                addNotification(t("errors.common", { ns: "common" }), "error");
            });
    }, [addNotification, categoryId, t]);

    return <>{products && products.length > 0 && <Recommendation recommendedProducts={products} />}</>;
};
