import styled from "styled-components";

const Recommendation = styled.div`
    display: flex;
    flex-grow: 1;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const RecommendationHdr = styled.div`
    margin-bottom: 24px;
`;

const RecommendationItems = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: stretch;
    justify-content: flex-start;
    margin-right: 1rem;
`;

const RecommendationItemsWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: stretch;
    justify-content: flex-start;
    margin-right: -1rem;
`;

const RecommendationProduct = styled.div<{ $isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    margin-bottom: 1rem;
    width: calc(var(--product-width) - 1rem);
    --product-width: 20%;

    @media ${({ theme }) => theme.media.lg} {
        --product-width: 30%;
    }

    @media ${({ theme }) => theme.media.md} {
        --product-width: 50%;
    }

    @media ${({ theme }) => theme.media.sm} {
        --product-width: 100%;
    }
`;

const Page = styled.div<{ $isMobile: boolean }>`
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
    max-width: ${(props) => (props.$isMobile ? "100vw" : "var(--desktop-screen-default)")};
    padding-left: ${(props) => (props.$isMobile ? "8px" : "var(--desktop-padding-default)")};
    padding-right: ${(props) => (props.$isMobile ? "8px" : "var(--desktop-padding-default)")};
`;

const Content = styled.div<{ $isMobile: boolean }>`
    min-width: ${(props) => (props.$isMobile ? "300px" : "1050px")};
    min-height: ${(props) => (props.$isMobile ? "initial" : "285px")};
    width: ${(props) => (props.$isMobile ? "100vw" : "1416px")};
    height: ${(props) => (props.$isMobile ? "auto" : "300px")};
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
`;

const CarouselWrapper = styled.div<{ $isMobile: boolean }>`
    border-radius: 12px;
    overflow: hidden;
    width: ${(props) => (props.$isMobile ? "100%" : "1416px")};
    display: flex;
    flex-direction: column;
    user-select: none;
    position: relative;
    transform: translateZ(0);
`;

export const Styled = {
    Recommendation,
    RecommendationHdr,
    RecommendationItems,
    RecommendationItemsWrapper,
    RecommendationProduct,
    Page,
    Content,
    CarouselWrapper,
};
