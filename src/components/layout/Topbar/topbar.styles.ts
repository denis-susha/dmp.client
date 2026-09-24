import Link from "next/link";
import styled, { css } from "styled-components";

const Topbar = styled.div`
    border-radius: 0.5rem;
    color: rgba(0, 26, 52, 0.6);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 1472px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 1.75rem;
    padding-right: 1.75rem;
`;

const LanguageButton = styled.button`
    align-items: center;
    background: rgba(0, 48, 120, 0.039);
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    color: rgba(0, 26, 52, 0.6);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    font-family: var(--mainFont);
    font-size: 12px;
    height: 20px;
    padding: 2px 4px 2px 2px;
    transition: var(--transition);
    transition-property: background-color;
    text-transform: none;
    margin-right: 12px;
`;

const LanguageButtonContainer = styled.div`
    align-items: center;
    display: flex;
`;

const RightItems = styled.ul`
    display: flex;
    margin-left: auto;
    flex-wrap: wrap;
    height: 1.5rem;
    justify-content: flex-end;
    overflow: hidden;
    padding: 0.25rem;
    text-overflow: ellipsis;
    list-style: none;
`;

const RightItem = styled.li`
    position: relative;
`;

const RightItemDiv = styled.div`
    display: inline-flex;
`;

const RightItemLink = styled(Link)<{ $stickOut?: boolean }>`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    color: rgba(0, 26, 52, 0.6);
    margin-bottom: 0.25rem;
    margin-left: 1rem;
    overflow: hidden;

    ${(props) =>
        props.$stickOut &&
        css`
            background-color: rgba(0, 150, 255, 0.078);
            border-radius: 0.5rem;
            color: rgba(0, 26, 52, 0.6);
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        `}

    &:hover {
        color: #0050e0;
    }
`;

export const Styled = {
    Topbar,
    Wrapper,
    LanguageButton,
    LanguageButtonContainer,
    RightItems,
    RightItem,
    RightItemDiv,
    RightItemLink,
};
