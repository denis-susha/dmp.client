import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    display: flex;
`;

const Progress = styled.div<{ $progressPercentage: number; $soonEnd: boolean }>`
    width: ${(props) => props.$progressPercentage + "%"};
    height: 20px;
    background-color: ${(props) => (props.$soonEnd ? "rgb(211, 47, 47)" : "rgb(56, 142, 60)")};
    transition: width 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const Background = styled.div<{ $soonEnd: boolean }>`
    width: 100%;
    height: 20px;
    background-color: ${(props) => (props.$soonEnd ? "#f44336" : "#4caf50")};
    transition: width 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
`;

const Content = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: "center";
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 2;
    color: white;
`;

const Title = styled.p`
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 12px;
    padding-right: 12px;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

export const Styled = {
    Container,
    Progress,
    Background,
    Content,
    Title,
    Spacer,
};
