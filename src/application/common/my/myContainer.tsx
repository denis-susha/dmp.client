import { PropsWithChildren, type FC } from "react";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./myContainer.styles";
import { IPaginationApiModel } from "@/services/models/tableQuery";
import PaginationComponent from "@/components/common/Pagination";
import { useMainStore } from "@/contexts/mainStoreProvider";

interface MyContainerProps extends PropsWithChildren {
    leftColumn: React.ReactNode;
    pagination: IPaginationApiModel;
    totalCount: number;
    header: string;
}

export const MyContainer: FC<MyContainerProps> = (props) => {
    const { isMobile } = useMainStore((state) => state);
    const { children, leftColumn, pagination, totalCount, header } = props;
    return (
        <Styled.Container $isMobile={isMobile}>
            <Grid.Row>
                <Styled.LeftColumn $isMobile={isMobile}>
                    <Styled.LeftColumnContainer>{leftColumn}</Styled.LeftColumnContainer>
                </Styled.LeftColumn>
                <Grid.Column>
                    <Styled.ListContainer>
                        <Styled.ListDiv>
                            <Styled.ListContainerHeader>
                                <span className="tsHeadline700XLarge">{header}</span>
                            </Styled.ListContainerHeader>
                            {children}
                        </Styled.ListDiv>
                        <Styled.Paging>
                            <Styled.PagingWrapper>
                                <Styled.PagingBox>
                                    <PaginationComponent
                                        currentPage={pagination.page}
                                        itemsPerPage={pagination.pageSize}
                                        totalCount={totalCount}
                                    />
                                </Styled.PagingBox>
                            </Styled.PagingWrapper>
                        </Styled.Paging>
                    </Styled.ListContainer>
                </Grid.Column>
            </Grid.Row>
        </Styled.Container>
    );
};
