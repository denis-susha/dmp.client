import { useCallback, useMemo, useState, type FC } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Styled } from "../styles";
import { useTranslation } from "next-i18next/pages";
import { DropdownList } from "@/components/common/DropdownList";
import { ProductSortingTypeEnum } from "@/services/models/catalog/productSortingTypeEnum";
import { useMainStore } from "@/contexts/mainStoreProvider";

function parseEnumIgnoreCase<T extends Record<string, string>>(enumObj: T, value: string) {
    const normalizedValue = value.toUpperCase();
    return Object.values(enumObj).find((enumValue) => enumValue.toUpperCase() === normalizedValue);
}

const featureName = "sorting";

export const Sorting: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { t } = useTranslation(["product"]);
    const { isMobile } = useMainStore((state) => state);
    const [selectedOption, setSelectedOption] = useState(ProductSortingTypeEnum.New as string);

    const options = useMemo(() => {
        if (searchParams && searchParams.has(featureName)) {
            const urlParamValue = searchParams.get(featureName);
            if (urlParamValue) {
                const valueFromUrl = parseEnumIgnoreCase(ProductSortingTypeEnum, urlParamValue);
                if (valueFromUrl !== undefined) {
                    setSelectedOption(valueFromUrl);
                }
            }
        }

        const optionsTmp = Object.keys(ProductSortingTypeEnum).map((key) => ({
            value: key,
            label: t("productSortingType." + key),
            selected: false,
        }));

        return optionsTmp;
    }, [searchParams, t]);

    const handleSelect = useCallback(
        (value: string) => {
            const sortValue = value as ProductSortingTypeEnum;
            const nextSearchParams = new URLSearchParams((searchParams ?? "").toString());
            const urlParamValue = nextSearchParams.get(featureName);

            if (urlParamValue) {
                const valueFromUrl = parseEnumIgnoreCase(ProductSortingTypeEnum, urlParamValue);
                if (valueFromUrl && (valueFromUrl as ProductSortingTypeEnum) === sortValue) {
                    return;
                }
            } else {
                if (sortValue == ProductSortingTypeEnum.New) {
                    return;
                }
            }

            if (sortValue !== ProductSortingTypeEnum.New) {
                nextSearchParams.set(featureName, sortValue.toLowerCase());
            } else {
                nextSearchParams.delete(featureName);
            }

            router.push(`${pathname}${nextSearchParams.size > 0 ? "?" : ""}${nextSearchParams}`, undefined, {
                scroll: false,
                shallow: false,
            });
        },
        [searchParams, router, pathname]
    );

    return (
        <div>
            <Styled.SearchResultsSortWrapper $isMobile={isMobile}>
                <Styled.SearchResultsSortDiv $isMobile={isMobile}>
                    <DropdownList options={options} onSelect={handleSelect} value={selectedOption} />
                </Styled.SearchResultsSortDiv>
            </Styled.SearchResultsSortWrapper>
        </div>
    );
};
