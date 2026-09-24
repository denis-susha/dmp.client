import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import Icon from "@/components/common/Icon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IMenuCategoryData } from "@/services/models/catalog/menuCategoryData";

const Parent: FC<{ href: string; title: string }> = (props) => (
    <div>
        <div className="box-border justify-start py-[6px] items-center flex flex-row w-full">
            <div className="ml-[4px] mr-0 p-0 self-baseline flex flex-[0_1]">
                <Icon icon="left-list-arrow" size={24} className="text-[rgba(0,26,52,0.4)] flex-[0_0_auto]" />
            </div>
            <div className="flex flex-[1_1] flex-col overflow-hidden">
                <div className="flex flex-row h-full">
                    <div className="px-0 py-[2px] w-full">
                        <Link href={`/${props.href}`} className="text-[#070707] block leading-[20px] tsBody500Medium">
                            {props.title}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Child: FC<{ href: string; title: string; isCurrent: boolean }> = (props) => (
    <div className={twMerge("ml-[20px]", props.isCurrent ? "bg-[#f5f7fa] rounded-[8px]" : "")}>
        <div className="box-border justify-start px-[8px] py-[6px] items-center flex flex-row w-full">
            <div className="flex flex-[1_1] flex-col overflow-hidden">
                <div className="flex flex-row h-full">
                    <div className="py-[2px] w-full">
                        {props.isCurrent ? (
                            <div className={"text-[#070707] cursor-pointer block leading-[20px] tsBody500Medium"}>
                                {props.title}
                            </div>
                        ) : (
                            <Link
                                href={`/${props.href}`}
                                className={"text-[#070707] block leading-[20px] hover:text-[#003ead] tsBody500Medium"}
                            >
                                {props.title}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export interface FilterParentLinksrops {
    categoryData: IMenuCategoryData;
}

export const FilterParentLinks: FC<FilterParentLinksrops> = (props) => {
    const { categoryData } = props;
    const { t } = useTranslation(["common"]);

    return (
        <div className="mb-[24px] flex flex-row flex-wrap w-full">
            <div className="w-full">
                <div className="pt-[12px]">
                    <div className="mb-[4px] pb-[6px] pt-[4px] tsCompactControl500Medium">{t("category")}</div>
                    {categoryData.category.parent && categoryData.category.parent.parent && (
                        <Parent
                            href={categoryData.category.parent.parent.url}
                            title={categoryData.category.parent.parent.title}
                        />
                    )}
                    {categoryData.category.parent && (
                        <Parent href={categoryData.category.parent.url} title={categoryData.category.parent.title} />
                    )}
                    <Child href={categoryData.category.url} title={categoryData.category.title} isCurrent={true} />
                    {categoryData.category.children &&
                        categoryData.category.children.map((cat, idx) => (
                            <Child key={"cat " + idx} href={cat.url} title={cat.title} isCurrent={false} />
                        ))}
                </div>
            </div>
        </div>
    );
};
