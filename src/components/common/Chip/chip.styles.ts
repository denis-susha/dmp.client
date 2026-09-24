import styled from "styled-components";

const Container = styled.div<{ $bgColor?: string }>`
    align-items: center;
    border-radius: 8px;
    color: #fff;
    display: inline-flex;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.29;
    padding: 4px 8px;
    background-color: ${(props) => (props.$bgColor ? props.$bgColor : "rgba(255, 255, 255, 0.5)")};
`;

const Title = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Styled = {
    Container,
    Title,
};
