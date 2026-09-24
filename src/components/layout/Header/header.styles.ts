import styled, { css } from "styled-components";
import Icon from "@/components/common/Icon";
import Image from "next/image";
import Link from "next/link";

const Header = styled.header`
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 1472px;
    min-height: 100px;
    padding-left: 1.75rem;
    padding-right: 1.75rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    width: 100%;
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 14px;
    justify-content: flex-start;
    line-height: 18px;
    min-height: 25px;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(7, 7, 7, 1);
    &:hover {
        color: #0050e0;
    }
`;

const StyledIcon = styled(Icon)`
    height: 1rem;
    margin-right: 0.25rem;
    object-fit: contain;
    width: 1rem;
    max-height: 100%;
    max-width: 100%;
    border: none;
    outline: none;
`;

const HorizontalMenu = styled.div`
    position: relative;
    z-index: 1;
    padding-top: 0.25rem;
`;

const HorizontalMenuListItem = styled.li`
    display: inline-flex;
    margin-right: 0.75rem;
    padding: 0.25rem;
`;

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
`;

const List = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    height: 25px;
    overflow: hidden;
    list-style: none;
    width: 100%;
`;

const HeaderAction = styled.div`
    position: relative;
    display: inline-flex;
`;

const HeaderActionLink = styled(Link)<{ $isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    box-sizing: border-box;
    color: #070707;
    height: ${(props) => (props.$isMobile ? "initial" : "3.5rem")};
    padding-top: 0.5rem;
    position: relative;
    width: ${(props) => (props.$isMobile ? "50px" : "76px")};

    &:hover {
        color: #0050e0;

        .header-action-name {
            color: #0050e0;
        }
    }
`;

const HeaderActionName = styled.span`
    color: #070707;
    font-size: 14px;
    line-height: 18px;
    margin-top: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;

    &:hover {
        color: #0050e0;
    }
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 2.5rem;
    margin-right: 2.25rem;
    position: relative;
    width: 8rem;
`;

const Logo = styled(Image)`
    max-width: 100%;
    max-height: 100%;
`;

const HeaderActionAccountWrapper = styled.div`
    cursor: pointer;
`;

const StickyBox = styled.div<{ $sticky: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 50;

    ${(props) =>
        props.$sticky &&
        css`
            box-sizing: border-box;
            height: 4rem;
            margin-left: -1.75rem;
            max-width: 1472px;
            padding-left: 1.75rem;
            padding-right: 1.75rem;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: calc(var(--z-index-popover) + 5);

            &:before {
                content: "";
                background-color: white;
                border-bottom: 1px solid rgba(204, 214, 228, 0.6);
                height: 63px;
                left: 0;
                position: fixed;
                top: 0;
                width: 100%;
            }
        `};
`;

const CatalogBtnWrapper = styled.div`
    margin-right: 0.75rem;
`;

const SearchBarBox = styled.div`
    margin-right: 1.5rem;
    flex-grow: 1;
`;

const HeaderActionAccount = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
`;

const HeaderActionNameBox = styled.div`
    display: inline-flex;
`;

export const Styled = {
    HorizontalMenu,
    HorizontalMenuListItem,
    Wrapper,
    List,
    StyledLink,
    StyledIcon,
    HeaderAction,
    HeaderActionLink,
    HeaderActionName,
    Logo,
    Header,
    LogoLink,
    HeaderActionAccountWrapper,
    StickyBox,
    CatalogBtnWrapper,
    SearchBarBox,
    HeaderActionAccount,
    HeaderActionNameBox,
};
