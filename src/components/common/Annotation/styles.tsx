import styled from "styled-components";
import Icon from "../Icon";

const Container = styled.div`
    box-sizing: border-box;
    width: -moz-fit-content;
    width: fit-content;
    background-color: #f2f5f9;
    color: #3d5165;
    border-radius: 16px;
    font-family: var(--mainFont);
    font-size: 14px;
    line-height: 18px;
    padding: 16px 24px 16px 16px;
    position: relative;
`;

const Wrapper = styled.div`
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
`;

const IconAnnotation = styled(Icon)<{ style: "default" | "disabled" }>`
    color: ${(props) => (props.style === "disabled" ? "rgba(0, 26, 52, 0.4)" : "#ffdddf")};
    flex: 0 0 24px;
    height: 24px;
    margin-right: 8px;
    min-width: 24px;
    width: 24px;
`;

const ContentContainer = styled.div`
    align-self: center;
    line-height: 18px;
    padding: 4px 0 2px;
`;

export const Styled = {
    Container,
    Wrapper,
    IconAnnotation,
    ContentContainer,
};
