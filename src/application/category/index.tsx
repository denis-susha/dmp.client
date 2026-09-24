import { useEffect, useState, type FC } from "react";
import { Styled } from "./styles";
import { CategoryRow } from "./categoryRow";
import { Grid } from "@/components/grid/grid.styles";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";
import { useMainStore } from "@/contexts/mainStoreProvider";

function splitIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    return result;
}

export interface CategoryCatalogIndexProps {
    categories: IMenuCategory[];
    rootName: string;
}

export const CategoryCatalogIndex: FC<CategoryCatalogIndexProps> = (props) => {
    const { categories, rootName } = props;
    const { isMobile } = useMainStore((state) => state);
    const [categoryRows, setCategoryRows] = useState<IMenuCategory[][]>();

    useEffect(() => {
        if (categories.length) {
            const rows = splitIntoChunks(categories.slice(), 6);
            setCategoryRows(rows);
        } else {
            setCategoryRows(undefined);
        }
    }, [categories]);

    return (
        <Grid.Container $isMobile={isMobile}>
            <Styled.ContainerRow>
                <Styled.ContainerColumn>
                    <Styled.Caption>
                        <Styled.CaptionHdr>
                            <div className="transition-colors">{rootName}</div>
                        </Styled.CaptionHdr>
                    </Styled.Caption>
                    {categoryRows?.map((item, idx) => (
                        <CategoryRow key={`CategoryRows_${idx}`} menuCategoryRow={item} />
                    ))}
                </Styled.ContainerColumn>
            </Styled.ContainerRow>
        </Grid.Container>
    );
};
