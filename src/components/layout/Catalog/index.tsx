import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./menuItem";
import CategoriesBlock from "./categoriesBlock";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { useTranslation } from "next-i18next/pages";

export const MenuIconMap: Record<number, string> = {
    2: "software",
    10: "source-code",
    25: "data-reports",
    34: "subscription",
    49: "webinar",
    59: "cards",
    74: "paint-brush",
    127: "key",
    133: "library",
    163: "game-controller",
    170: "3d-printer",
    181: "badge",
    188: "contract",
};

const distributeIntoColumns = (models: IMenuCategory[]): IMenuCategory[][] => {
    const columns: IMenuCategory[][] = [[], [], []];

    // Distribute the models into the three columns
    models.forEach((model, index) => {
        columns[index % 3].push(model);
    });

    return columns;
};

interface Props {
    catalogBtnRef: RefObject<HTMLDivElement | null>;
}

export const Catalog: FC<Props> = ({ catalogBtnRef }) => {
    const { i18n } = useTranslation();
    const { menu } = useMainStore((state) => state);
    const { selectedCategory, setSelectedCategoryId, toggleMenu } = useMainStore((state) => state);

    const [categoryColumns, setCategoryColumns] = useState<IMenuCategory[][]>();

    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const menuCategoryId = menu?.categories ? menu?.categories[0].menuCategoryId : null;

        if (menuCategoryId) {
            setSelectedCategoryId(menuCategoryId, i18n.language);
        }
    }, [i18n.language, menu?.categories, setSelectedCategoryId]);

    useEffect(() => {
        if (selectedCategory && selectedCategory.children) {
            const columns = distributeIntoColumns(selectedCategory.children.slice());
            setCategoryColumns(columns);
        } else {
            setCategoryColumns(undefined);
        }
    }, [selectedCategory]);

    const onMenuHoverSelect = useCallback(
        (menuCategoryId: number) => {
            setSelectedCategoryId(menuCategoryId, i18n.language);
        },
        [i18n.language, setSelectedCategoryId]
    );

    const handleClickOutside = (e: any) => {
        if (
            mainRef &&
            !mainRef.current?.contains(e.target) &&
            catalogBtnRef &&
            !catalogBtnRef.current?.contains(e.target)
        ) {
            toggleMenu();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    return (
        <div
            ref={mainRef}
            className="h-[calc(-100px+100vh)] box-border w-full bg-white bottom-0 left-0 overflow-auto py-[14px] fixed right-0 transition duration-300 z-1000"
        >
            <div className="flex h-full mx-auto max-w-[1472px] min-w-[1280px] px-[28px] pl-[15px] relative box-border w-full">
                <div className="overflow-y-auto pr-[12px] w-[282px] flex flex-col gap-[14px]">
                    <ul className="list-none">
                        {menu?.categories?.map((c, idx) => (
                            <MenuItem
                                key={idx}
                                iconName={MenuIconMap[c.menuCategoryId]}
                                menuCategory={c}
                                isSelected={c.menuCategoryId === selectedCategory?.menuCategoryId}
                                onHoverSelect={onMenuHoverSelect}
                            />
                        ))}
                    </ul>
                </div>
                <div className="bg-[rgba(0,48,120,0.039)] rounded-[30px] mx-[24px] ml-[12px] w-px"></div>
                <div className="overflow-y-auto w-[calc(100%-331px)] flex flex-col gap-[24px]">
                    <div className="flex items-end gap-[8px]">
                        <div className="text-[32px] font-bold tracking-[0.4px] leading-[36px]">
                            {selectedCategory?.title}
                        </div>
                    </div>
                    {categoryColumns && <CategoriesBlock categoryColumns={categoryColumns} />}
                </div>
            </div>
        </div>
    );
};
