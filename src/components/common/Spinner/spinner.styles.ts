import styled, { keyframes } from "styled-components";

const Container = styled.div<{ $full: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: ${(props) => (props.$full ? "fixed" : "absolute")};
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1000;
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spin = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #005bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

export const Styled = {
    Container,
    Spin,
};
