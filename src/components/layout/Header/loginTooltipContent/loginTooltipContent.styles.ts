import Button from "@/components/common/Button";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

const Btn = styled(Button)`
    & {
        margin-top: 16px;
        padding: 8px 12px;
    }
`;

const BtnIneerBox = styled.div`
    height: 16px;
    display: flex;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const BtnIneerWrapper = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

export const Styled = {
    Container,
    Btn,
    BtnIneerBox,
    BtnIneerWrapper,
};
