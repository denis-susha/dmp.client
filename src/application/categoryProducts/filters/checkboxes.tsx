import { useCallback, useEffect, useState, type FC } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CheckboxItem } from "./checkboxItem";
import { useRouter } from "next/router";
import { ICategoryFeature } from "@/services/models/catalog/categoryFeature";
import { Styled } from "./filters.styles";
import { useTranslation } from "next-i18next/pages";

const delimiter = ";";

export interface ICheckboxesProps {
    feature: ICategoryFeature;
}

export const Checkboxes: FC<ICheckboxesProps> = (props) => {
    const { t } = useTranslation(["category-data"]);
    const { feature: f } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [optionKeys, setOptionKeys] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (searchParams && searchParams.has(f.name)) {
            const urlParamValue = searchParams.get(f.name);
            f.filterCheckboxes?.forEach((filterCheckbox) => {
                if (urlParamValue?.indexOf(filterCheckbox.key) !== -1) {
                    setOptionKeys((prev) => ({ ...prev, [filterCheckbox.key]: true }));
                } else {
                    setOptionKeys((prev) => {
                        const newItems = { ...prev };
                        delete newItems[filterCheckbox.key];
                        return newItems;
                    });
                }
            });
        } else {
            setOptionKeys({});
        }
    }, [f.filterCheckboxes, f.name, searchParams]);

    const onChange = useCallback(
        (checked: boolean, key: string) => {
            const nextSearchParams = new URLSearchParams((searchParams ?? "").toString());

            let paramValue = nextSearchParams.get(f.name);
            if (checked) {
                paramValue = paramValue ? paramValue + delimiter + key : key;
                nextSearchParams.set(f.name, paramValue);
            } else {
                paramValue = paramValue ? paramValue.replace(key + delimiter, "").replace(key, "") : "";
                if (paramValue.startsWith(delimiter)) {
                    paramValue = paramValue.substring(1);
                }
                if (paramValue.endsWith(delimiter)) {
                    paramValue = paramValue.substring(0, paramValue.length - 1);
                }

                if (paramValue) {
                    nextSearchParams.set(f.name, paramValue);
                } else {
                    nextSearchParams.delete(f.name);
                }
            }

            router.push(`${pathname}${nextSearchParams.size > 0 ? "?" : ""}${nextSearchParams}`, undefined, {
                scroll: false,
                shallow: false,
            });
        },
        [searchParams, f.name, router, pathname]
    );

    const onOpenClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    return (
        <Styled.Checkboxes className="custom-scrollbar">
            <Styled.CheckboxesWrapper open={open}>
                {f.filterCheckboxes?.slice(0, open ? f.filterCheckboxes.length : 5).map((fc) => (
                    <CheckboxItem key={fc.key} onChange={onChange} checkboxItem={fc} checked={optionKeys[fc.key]} />
                ))}
            </Styled.CheckboxesWrapper>
            {f.filterCheckboxes && f.filterCheckboxes.length > 5 && (
                <Styled.CheckboxesShowMoreBtn style="simple" onClick={onOpenClick}>
                    <Styled.CheckboxesShowMore className="tsBodyControl500Medium">
                        {t(open ? "checkboxesShowMoreOpen" : "checkboxesShowMoreClosed")}
                    </Styled.CheckboxesShowMore>
                </Styled.CheckboxesShowMoreBtn>
            )}
        </Styled.Checkboxes>
    );
};
