import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Item = styled(Link)`
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color;
    opacity: 1;

    &:hover {
        opacity: 0.7;
    }
`;

const ItemInnerBox = styled.div`
    padding: 9px 16px 9px 16px;
`;

export const Styled = {
    Container,
    Item,
    ItemInnerBox,
};
