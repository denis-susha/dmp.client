import { useCallback, useEffect, useState, type FC } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { RangeItem } from "./rangeItem";
import extractWholeNumber from "@/utils/number/extractWholeNumber";
import { useTranslation } from "next-i18next/pages";
import { ICategoryFeature } from "@/services/models/catalog/categoryFeature";

const delimiter = ";";

export interface IRangeProps {
    feature: ICategoryFeature;
}

export const Range: FC<IRangeProps> = (props) => {
    const { feature: f } = props;

    const { t } = useTranslation(["product"]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [leftValue, setLeftValue] = useState("");
    const [rightValue, setRightValue] = useState("");

    useEffect(() => {
        if (searchParams && searchParams.has(f.name)) {
            const urlParamValue = searchParams.get(f.name);
            if (urlParamValue) {
                const values = urlParamValue.split(delimiter);
                setLeftValue(values[0]);
                setRightValue(values[1]);
            }
        } else {
            setLeftValue("");
            setRightValue("");
        }
    }, [f.name, searchParams, setLeftValue, setRightValue]);

    const onRangeChange = useCallback(
        (side: "left" | "right") => {
            const nextSearchParams = new URLSearchParams((searchParams ?? "").toString());
            const paramValue = nextSearchParams.get(f.name);

            let leftValueTmp;
            let rightValueTmp;
            if (paramValue) {
                const values = paramValue.split(delimiter);
                leftValueTmp = values[0];
                rightValueTmp = values[1];
            }

            if (side == "left") {
                leftValueTmp = extractWholeNumber(leftValue);
                if (leftValueTmp === null) {
                    setLeftValue("");
                    return;
                }
                setLeftValue(leftValueTmp);

                if (!rightValue) {
                    rightValueTmp = f.rangeMax;
                }
            } else {
                rightValueTmp = extractWholeNumber(rightValue);
                if (rightValueTmp === null) {
                    setRightValue("");
                    return;
                }
                setRightValue(rightValueTmp);

                if (!leftValue) {
                    leftValueTmp = f.rangeMin;
                }
            }

            const newParamValue = leftValueTmp + delimiter + rightValueTmp;

            if (newParamValue != paramValue) {
                nextSearchParams.set(f.name, newParamValue);
                router.push(`${pathname}${nextSearchParams.size > 0 ? "?" : ""}${nextSearchParams}`, undefined, {
                    scroll: false,
                    shallow: false,
                });
            }
        },
        [searchParams, f.name, f.rangeMax, f.rangeMin, leftValue, rightValue, router, pathname]
    );

    return (
        <div className="w-full tsBody500Medium">
            <div className="flex justify-between">
                <RangeItem
                    rangeValue={leftValue}
                    placeholder={t("rangeFrom")}
                    min={f.rangeMin!}
                    max={f.rangeMax!}
                    onRangeValueChange={setLeftValue}
                    onBlur={() => onRangeChange("left")}
                />
                <RangeItem
                    rangeValue={rightValue}
                    placeholder={t("rangeTo")}
                    min={f.rangeMin!}
                    max={f.rangeMax!}
                    onRangeValueChange={setRightValue}
                    onBlur={() => onRangeChange("right")}
                />
            </div>
        </div>
    );
};
