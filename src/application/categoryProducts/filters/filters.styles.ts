import Button from "@/components/common/Button";
import styled from "styled-components";

const Checkboxes = styled.div`
    width: 100%;
`;

const CheckboxesWrapper = styled.div<{ open: boolean }>`
    max-height: 406px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    min-height: ${(props) => (props.open ? "72px" : "initial")};
`;

const CheckboxesShowMoreBtn = styled(Button)`
    margin-top: 4px;
`;

const CheckboxesShowMore = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Styled = {
    Checkboxes,
    CheckboxesWrapper,
    CheckboxesShowMoreBtn,
    CheckboxesShowMore,
};
