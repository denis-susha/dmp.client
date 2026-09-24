import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./styles";
import { FeatureTypeEnum } from "@/services/models/catalog/featureTypeEnum";
import { IProductData } from "@/services/models/product/productData";
import { ICategoryFeature } from "@/services/models/catalog/categoryFeature";

const Value: FC<{ feature?: ICategoryFeature; value: string }> = ({ feature, value }) => {
    const { t } = useTranslation(["product"]);

    if (!feature) {
        return <span>{value}</span>;
    }

    switch (feature.type) {
        case FeatureTypeEnum.Bool: {
            const realValue = value.substring(feature.name.length + 1);
            return t("productFeatureBool." + realValue);
        }

        case FeatureTypeEnum.Checkboxes:
            if (feature.multipleChoice) {
                const valuesArray = value.split(";");
                let result = "";
                valuesArray.forEach((value) => {
                    if (result.length) {
                        result += ", ";
                    }
                    const realValue = value.substring(feature.name.length + 1);
                    result += feature.filterCheckboxes?.find((fc) => fc.key === realValue)?.title;
                });

                return result;
            } else {
                const realValue = value.substring(feature.name.length + 1);
                return feature.filterCheckboxes?.find((fc) => fc.key === realValue)?.title;
            }

        default:
            break;
    }

    return value;
};

export interface IShortCharacteristicsProps {
    productData: IProductData;
}

export const ShortCharacteristics: FC<IShortCharacteristicsProps> = ({ productData }) => {
    const productFeatures: Record<string, string> = {};

    productData.category.features?.forEach((f) => {
        if (f.name === "price") {
            return;
        }

        const pf = productData.product.features?.find((p) => p.key === f.name);
        if (!pf) {
            if (f.type === FeatureTypeEnum.Range) {
                const rangeValue = (
                    f.name === "duration"
                        ? productData.product.duration
                        : f.name === "year"
                          ? productData.product.year
                          : ""
                )!.toString();
                if (rangeValue) {
                    productFeatures[f.name] = rangeValue;
                }
            }

            return;
        }

        let value = productFeatures[pf.key];
        if (value) {
            value += ";" + pf.value;
            productFeatures[pf.key] = value;
        } else {
            productFeatures[pf.key] = pf.value;
        }
    });

    return (
        <Styled.ShortCharacteristicsItems>
            {Object.entries(productFeatures).map(([key, value], idx) => (
                <Styled.ShortItem key={idx}>
                    <Styled.ShortItemPropNameContainer>
                        <Styled.ShortItemPropName>
                            <Styled.ShortItemPropNameTitle className="tsBodyM">
                                {productData.category.features?.find((f) => f.name === key)?.title}
                            </Styled.ShortItemPropNameTitle>
                        </Styled.ShortItemPropName>
                    </Styled.ShortItemPropNameContainer>
                    <Styled.ShortItemPropValueContainer>
                        <Styled.ShortItemPropTitle className="tsBody400Small">
                            <Value feature={productData.category.features?.find((f) => f.name === key)} value={value} />
                        </Styled.ShortItemPropTitle>
                    </Styled.ShortItemPropValueContainer>
                </Styled.ShortItem>
            ))}
        </Styled.ShortCharacteristicsItems>
    );
};
