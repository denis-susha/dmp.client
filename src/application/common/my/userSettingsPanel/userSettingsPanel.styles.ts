import Link from "next/link";
import styled from "styled-components";

const NameBox = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    position: relative;
    width: -moz-fit-content;
    width: fit-content;
`;

const NameBoxTitle = styled.span`
    color: #070707;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    word-break: break-word;
`;

const FirstNameTitle = styled(NameBoxTitle)`
    margin-top: 8px;
`;

const ChangeProfileBtnInner = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MenuContainer = styled.div`
    font-size: 16px;
`;

const MenuBox = styled.div`
    margin-bottom: 24px;
`;

const MenuHeader = styled.div`
    color: #070707;
    font-weight: 700;
    margin-bottom: 12px;
    margin-left: 8px;
`;

const MenuLink = styled(Link)`
    align-items: center;
    border-radius: 3px;
    color: #070707;
    display: flex;
    margin-bottom: 10px;
    padding: 2px 8px;
    width: -moz-fit-content;
    width: fit-content;
    transition: var(--transition);
    transition-property: color;

    &:hover {
        text-decoration: underline;
    }
`;

export const Styled = {
    NameBox,
    NameBoxTitle,
    FirstNameTitle,
    ChangeProfileBtnInner,
    MenuContainer,
    MenuBox,
    MenuHeader,
    MenuLink,
};
