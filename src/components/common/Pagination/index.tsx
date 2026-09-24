import React from "react";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./pagination.styles";

const minPageValue = 4;
const maxPageRatio = 4;

const Dots = () => <Styled.Dots>...</Styled.Dots>;

const PageButton = (href: Url, title: string) => (
    <Styled.PageButtonLink href={href}>
        <Styled.PageButton>
            <Styled.PageButtonBody className="tsBodyControl400Small">{title}</Styled.PageButtonBody>
        </Styled.PageButton>
        <Styled.PageButtonBg />
    </Styled.PageButtonLink>
);

export interface IPaginationComponentProps {
    currentPage: number;
    itemsPerPage: number;
    totalCount: number;
}

const PaginationComponent: React.FC<IPaginationComponentProps> = (props) => {
    const { t } = useTranslation(["common"]);
    const { currentPage, itemsPerPage, totalCount } = props;
    const router = useRouter();
    const { query } = router;
    const { page, ...restOfQuery } = query;

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (totalPages < 2) {
        return null;
    }

    const maxVisablePageIdx = currentPage + maxPageRatio;
    const showEndDots = totalPages > currentPage + maxPageRatio + 1;

    const startBtnHref = {
        pathname: router.pathname,
        query: restOfQuery,
    };

    const nextBtnHref = {
        pathname: router.pathname,
        query: { ...query, page: currentPage + 1 },
    };

    return (
        <Styled.Container>
            {currentPage > minPageValue && (
                <>
                    {PageButton(startBtnHref, t("beginning"))}
                    <Dots />
                </>
            )}

            <div>
                {Array.from({ length: totalPages }, (_, index) => {
                    const pgIdx = index + 1;

                    if (maxVisablePageIdx <= index - 1) {
                        return null;
                    }

                    if (currentPage > 4 && pgIdx < currentPage - 2) {
                        return null;
                    }

                    const href = {
                        pathname: router.pathname,
                        query: { ...query, page: pgIdx },
                    };

                    return (
                        <Styled.PageNumberLink key={index} href={href} $isActive={currentPage === pgIdx}>
                            {pgIdx}
                        </Styled.PageNumberLink>
                    );
                })}
            </div>
            {currentPage !== totalPages && (
                <>
                    {showEndDots && <Dots />}
                    {PageButton(nextBtnHref, t("further"))}
                </>
            )}
        </Styled.Container>
    );
};

export default PaginationComponent;
