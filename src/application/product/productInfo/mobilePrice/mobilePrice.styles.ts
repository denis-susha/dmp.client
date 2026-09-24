import styled from "styled-components";

const Container = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: column;
`;

const PriceContainer = styled.div`
    align-items: flex-start;
    background-color: #f5f7fa;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 12px;
`;

const PriceWrapper = styled.div`
    max-width: 100%;
    position: relative;
    width: 100%;
`;

export const Styled = {
    Container,
    PriceContainer,
    PriceWrapper,
};
