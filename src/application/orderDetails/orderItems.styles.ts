import styled from "styled-components";

const Container = styled.div`
    background-color: #fff;
    border-radius: 24px;
    padding: 24px 24px 16px;
    position: relative;
`;

const RelativeContainer = styled.div`
    position: relative;
`;

const HeaderStatusWrapper = styled.div`
    align-items: center;
    display: flex;
`;

const HeaderStatusTitle = styled.div`
    color: rgba(0, 26, 52, 0.6);
    width: auto;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    word-break: break-word;
`;

const HeaderStatusDetailsContainer = styled.div`
    margin-top: 2px;
    position: relative;
`;

const HeaderStatusCompleteDetailsContainer = styled.div`
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

const ItemsContainer = styled.div`
    margin-top: 24px;
`;

const HeaderAction = styled.div`
    margin-top: 10px;
`;

export const Styled = {
    Container,
    RelativeContainer,
    HeaderStatusWrapper,
    HeaderStatusTitle,
    HeaderStatusDetailsContainer,
    HeaderStatusCompleteDetailsContainer,
    ItemsContainer,
    HeaderAction,
};
