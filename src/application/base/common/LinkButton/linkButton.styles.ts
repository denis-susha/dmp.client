import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import styled from "styled-components";

const LinkBtn = styled(Button)`
    color: rgba(0, 26, 52, 0.6);
`;

const Arrow = styled(Icon)`
    color: rgba(0, 26, 52, 0.6);
    margin-right: 8px;
    flex-shrink: 0;
`;

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Styled = {
    LinkBtn,
    Title,
    Arrow,
};
