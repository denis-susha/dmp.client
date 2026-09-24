import { MediaWidth } from "@/styles/common";
import styled, { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --darkSpace: #001a34;
    --darkSpace10: #eff3f6;
}


body {
    color: var(--darkSpace);

    ul {
        list-style: none;
    }
}
`;

const LinkButton = styled.a`
    align-content: center;
    align-items: center;
    background-color: #005bff;
    border: none;
    border-radius: 1rem;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-grid;
    font-weight: 500;
    grid-auto-flow: column;
    justify-content: center;
    letter-spacing: 0.025rem;
    line-height: 1.25rem;
    min-height: 5rem;
    min-width: 5rem;
    padding: 0 1.5rem;
    text-align: center;
    transition: 0.15s ease-in-out;
    transition-property: background-color, color, opacity;

    &:hover {
        color: #fff;
        background-color: #004ed6;
    }
`;

const HeaderButton = styled(LinkButton)`
    background-color: var(--darkSpace);

    min-height: 2.5rem;
    min-width: 2.5rem;
    border-radius: 0.625rem;

    &:hover {
        color: #96a3ae;
        background-color: var(--darkSpace);
    }

    @media screen and (max-width: ${MediaWidth.Large}) {
        width: 100%;
        margin-bottom: 1rem;
    }
`;

const LinkButtonSmall = styled(LinkButton)`
    min-height: 2.5rem;
    min-width: 2.5rem;
    border-radius: 0.625rem;
`;

const Page = styled.div`
    background-color: #dde2f0;
    background-position: top;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    width: 100%;
    a {
        text-decoration: none;
    }
`;

const Header = styled.header`
    box-sizing: border-box;
    color: var(--darkSpace);
    min-height: 4.25rem;
    padding: 0.875rem 1rem;
    position: relative;
    width: 100%;
    z-index: 999;

    @media screen and (min-width: 650px) {
        height: 5rem;
        padding: 1.25rem 1.75rem;
    }
`;

const HeaderBox = styled.div`
    align-items: center;
    -moz-column-gap: 1.25rem;
    column-gap: 1.25rem;
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1920px;
`;

const HeaderLogo = styled.div`
    -moz-column-gap: 1.5rem;
    column-gap: 1.5rem;
    display: grid;
    grid-auto-columns: max-content;
    grid-auto-flow: column;

    @media screen and (min-width: 1200px) {
        -moz-column-gap: 2.813rem;
        column-gap: 2.813rem;
    }
`;

const HeaderLogoLink = styled.a`
    max-width: 10.625rem;
    display: flex;

    div {
        font-size: 44px;
        line-height: 35px;
        font-weight: 700;
        margin-left: 10px;
        letter-spacing: -0.05rem;
    }

    @media screen and (min-width: 1200px) {
        max-width: 13.438rem;
    }

    @media screen and (max-width: 650px) {
        flex-direction: column;

        img {
            width: 90px;
            height: auto;
        }

        div {
            font-size: 30px;
            line-height: initial;
            font-weight: 700;
            margin-left: 0px;
        }
    }
`;

const HeaderActions = styled.div<{ $open: boolean }>`
    display: flex;
    justify-content: flex-end;

    ${({ $open }) =>
        $open &&
        css`
            @media screen and (max-width: ${MediaWidth.Large}) {
                position: fixed;
                inset: 0;
                background-color: #dde2f0;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                gap: 2rem;
                font-size: 1.5rem;
            }
        `}
`;

const HeaderNav = styled.nav<{ $open: boolean }>`
    align-items: stretch;
    -moz-column-gap: 1.5rem;
    column-gap: 1.5rem;
    display: grid;
    grid-auto-flow: column;
    max-width: 34.375rem;

    @media screen and (max-width: ${MediaWidth.Large}) {
        display: none;
        margin-top: 2.5rem;
        max-width: 100%;
    }

    ${({ $open }) =>
        $open &&
        css`
            @media screen and (max-width: ${MediaWidth.Large}) {
                display: block;
            }
        `}
`;

const HeaderNavLink = styled.a`
    align-items: center;
    color: inherit;
    -moz-column-gap: 0.5rem;
    column-gap: 0.5rem;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;

    span {
        font-size: 1.2rem;
        font-weight: 300;
        letter-spacing: 0.025rem;
        line-height: 1.25rem;

        @media screen and (max-width: ${MediaWidth.Large}) {
            font-size: 2rem;
            line-height: initial;
        }
    }

    @media screen and (max-width: ${MediaWidth.Large}) {
        box-sizing: border-box;
        padding: 0.875rem 0;
        width: 100%;
    }
`;

const HeaderButtonsBox = styled.div<{ $open: boolean }>`
    display: grid;
    grid-auto-flow: column;
    -moz-column-gap: 0.75rem;
    column-gap: 0.75rem;
    margin-left: 1.5rem;

    @media screen and (min-width: 1200px) {
        -moz-column-gap: 1rem;
        column-gap: 1rem;
        margin-left: 2rem;
    }

    @media screen and (max-width: ${MediaWidth.Large}) {
        display: none;
    }

    ${({ $open }) =>
        $open &&
        css`
            @media screen and (max-width: ${MediaWidth.Large}) {
                display: block;
            }
        `}
`;

const IntroSection = styled.section`
    opacity: 1;
    transform: none;
    transition: 0.8s ease;
    transition-property: opacity, transform;
    display: flex;
    flex-direction: column;
    padding: 1.75rem 1rem 1.25rem;

    @media screen and (min-width: 1200px) {
        align-items: center;
        justify-content: center;
    }

    @media screen and (min-width: ${MediaWidth.Medium}) {
        flex-direction: row-reverse;
        padding: 6.625rem 1.75rem 1.875rem;
    }
`;

const IntroImageBox = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;

    img {
        border-radius: 40px;
    }

    @media screen and (min-width: 1200px) {
        margin-left: 3.75rem;
    }

    @media screen and (min-width: ${MediaWidth.Medium}) {
        flex-direction: row;
        margin: 0 0 0 1.5rem;
    }
`;

const IntroTitleBox = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1200px) {
        max-width: 34.375rem;
    }

    @media screen and (min-width: 650px) {
        padding: 1.313rem 0;
    }
`;

const IntroTitleWrapper = styled.div`
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1200px) {
        margin-bottom: 2.5rem;
    }

    @media screen and (min-width: ${MediaWidth.Medium}) {
        margin-bottom: 2.625rem;
    }
`;

const IntroHeader = styled.h1`
    margin-bottom: 0.75rem;
    letter-spacing: 0.075rem;
    font-size: 2rem;
    line-height: 2.25rem;
    font-weight: 900;
    white-space: pre-line;

    @media screen and (min-width: 1200px) {
        font-size: 3.75rem;
        line-height: 3.75rem;
    }

    @media screen and (min-width: ${MediaWidth.Medium}) {
        margin-bottom: 1.5rem;
    }

    @media screen and (min-width: 1200px) {
        font-size: 5rem;
        letter-spacing: 0.1125rem;
        line-height: 5rem;
    }

    @media screen and (min-width: 650px) {
        font-size: 3.75rem;
        line-height: 3.75rem;
    }

    @media screen and (min-width: 650px) {
        letter-spacing: 0.1125rem;
    }
`;

const IntroHeaderTitle = styled.p`
    letter-spacing: 0.025rem;
    font-size: 1rem;
    gap: 1.5rem;
    line-height: 1.25rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    white-space: pre-line;
`;

const IntroActionWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    row-gap: 1.25rem;

    @media screen and (min-width: ${MediaWidth.Medium}) {
        -moz-column-gap: 1.5rem;
        column-gap: 1.5rem;
        grid-auto-columns: max-content;
        grid-auto-flow: column;
    }
`;

const OpportunitiesSection = styled.section`
    display: block;
    opacity: 1;
    transform: none;
    transition: 0.8s ease;
    transition-property: opacity, transform;
    padding-top: 0.25rem;

    @media screen and (min-width: 1200px) {
        margin: 2.5rem auto;
        max-width: 73.5rem;
        padding: 0;
    }

    @media screen and (min-width: 650px) {
        padding: 1.25rem 1.75rem 0;
    }

    @media screen and (max-width: 650px) {
        margin-top: 2.5rem;
        width: auto;
    }
`;

const OpportunitiesHeader = styled.h2`
    padding: 0 1rem;
    margin-bottom: 1.5rem;
    white-space: pre-line;
    font-weight: 900;
    font-size: 2rem;

    @media screen and (min-width: 1200px) {
        margin-bottom: 3.75rem;
    }

    @media screen and (min-width: 650px) {
        margin-bottom: 2.5rem;
        padding: 0;
        text-align: center;
    }

    @media screen and (min-width: 650px) {
        letter-spacing: 0.1125rem;
    }

    @media screen and (min-width: 650px) {
        font-size: 5rem;
        line-height: 5rem;
    }
`;

const OpportunitiesList = styled.ul`
    -moz-column-gap: 1rem;
    column-gap: 1rem;
    display: flex;
    padding: 0 1rem;
    -ms-overflow-style: none;
    overflow-x: scroll;
    scrollbar-width: none;

    @media screen and (min-width: 650px) {
        display: grid;
        gap: 1.5rem;
        grid-auto-flow: row;
        grid-auto-rows: 1fr;
        grid-template-columns: repeat(2, 1fr);
        padding: 0;
    }
`;

const OpportunitiesItem = styled.li`
    background-color: #fff;
    border-radius: 1.25rem;
    box-sizing: border-box;
    flex: 1 0 70%;
    max-width: 25rem;
    min-width: 13.25rem;
    padding: 0.875rem 1.25rem 1.625rem;

    @media screen and (min-width: ${MediaWidth.Large}) {
        border-radius: 2.5rem;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        max-width: none;
        overflow: hidden;
        padding: 2rem 2rem 1.75rem;
    }
`;

const OpportunitiesItemImage = styled.div`
    align-items: center;
    display: flex;
    height: 7.125rem;
    margin-bottom: 0.75rem;

    @media screen and (min-width: 1200px) {
        max-width: none;
    }

    @media screen and (min-width: ${MediaWidth.Large}) {
        height: 100%;
        margin-bottom: 0;
        max-width: 9.375rem;
    }

    @media screen and (max-width: ${MediaWidth.Large}) {
        img {
            width: 110px;
        }
    }
`;

const OpportunitiesItemText = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: max-content;
    row-gap: 0.75rem;

    @media screen and (min-width: 1200px) {
        max-width: 20rem;
    }

    @media screen and (min-width: ${MediaWidth.Large}) {
        max-width: 16.875rem;
    }
`;

const OpportunitiesItemTextHdr = styled.h3`
    text-wrap: balance;
    margin: 0;
    letter-spacing: 0.05rem;
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: 600;
    white-space: pre-line;

    @media screen and (min-width: 650px) {
        letter-spacing: 0.025rem;
    }

    @media screen and (min-width: 650px) {
        font-size: 1.5rem;
        line-height: 1.75rem;
    }
`;

const OpportunitiesItemTextTitle = styled.p`
    margin-bottom: 0.5rem;
    text-wrap: balance;
    margin: 0;
    letter-spacing: 0.025rem;
    font-size: 1rem;
    gap: 1.5rem;
    line-height: 1.25rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    white-space: pre-line;
`;

const OpportunitiesAction = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-flow: row;
    margin-top: 1.5rem;
    padding: 0 1rem;

    @media screen and (min-width: 650px) {
        grid-auto-flow: column;
        justify-content: center;
        margin-top: 2.5rem;
        padding: 0;
    }
`;

const MobileTabsBox = styled.div`
    display: none;
    padding: 0 1rem;
    margin-bottom: 2.5rem;

    h3 {
        font-size: 1.5rem;
        line-height: 1.75rem;
        text-wrap: balance;
        margin: 0;
        letter-spacing: 0.05rem;

        line-height: 1.5rem;
        font-weight: 600;
        white-space: pre-line;
    }

    @media screen and (max-width: ${MediaWidth.Large}) {
        display: block;
    }
`;

const Tabs = styled.div`
    text-align: center;
    margin-bottom: 2rem;

    @media screen and (max-width: ${MediaWidth.Large}) {
        display: none;
    }
`;

const TabHeaders = styled.div`
    display: inline-flex;
    justify-content: space-evenly;
    box-shadow: inset 0 -1px 0 0 #d1d2e0;
`;

const TabHeaderBox = styled.div<{ $isActive: boolean }>`
    border-bottom: 0.2rem solid #303141;
    border-bottom: ${(props) => (props.$isActive ? "0.1rem solid #303141" : "none")};
`;

const TabHeader = styled.button<{ $isActive: boolean }>`
    padding: 10px 20px;
    border: none;
    background: none;
    cursor: ${(props) => (props.$isActive ? "default" : "pointer")};
    font-size: 16px;
    transition: all 0.3s;
    color: ${(props) => (props.$isActive ? "#007bff" : "inherit")};

    &:hover {
        ${(props) =>
            !props.$isActive &&
            css`
                color: #0056b3;
            `};
    }
`;

const TabContent = styled.div`
    padding: 20px;
`;

const TabContentItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 380px;

    img {
        border-radius: 25px;
    }

    @media screen and (max-width: ${MediaWidth.Large}) {
        min-height: auto;
        margin-bottom: 2.5rem;
    }

    @media screen and (max-width: ${MediaWidth.Small}) {
        flex-direction: column;
    }
`;

const TabContentText = styled.div`
    max-width: 25rem;
    margin: 0 4rem 0 0;
    text-align: left;
    font-size: 18px;

    p {
        margin-bottom: 0.2rem;
    }

    @media screen and (max-width: ${MediaWidth.Medium}) {
        max-width: 100%;
    }

    @media screen and (max-width: ${MediaWidth.Small}) {
        margin: 0 1rem 0 0;
    }
`;

const TabContentTextList = styled.ul`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    @media screen and (min-width: 650px) {
        li {
            margin-bottom: 0.2rem;

            &:not(:first-child) {
                margin-top: 0.5rem;
            }
        }
    }
`;

const TabContentTextListItem = styled.li`
    span {
        margin: 0 0 0 0.5rem;
    }

    &:before {
        content: "—";
    }
`;

const TabContentTextBtnBox = styled.div`
    margin-top: 0.8rem;

    @media screen and (max-width: ${MediaWidth.Small}) {
        margin: 1rem 0;
        text-align: center;
    }
`;

const FaqSection = styled.section`
    background-color: #001a34;
    border-radius: 40px 40px 0 0;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 650px) {
        padding: 60px 28px 80px;
    }

    @media screen and (min-width: 1200px) {
        border-radius: 60px 60px 0 0;
        padding: 100px 148px;
    }
`;

const FaqSectionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const FaqHeader = styled(OpportunitiesHeader)`
    color: #fff;
`;

const FaqBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 30px;
    color: #fff;
`;

const FaqAccordiinTitle = styled.p`
    font-weight: 375;

    @media (min-width: 650px) {
        font-size: 20px;
        letter-spacing: 0.8px;
        line-height: 28px;
    }

    @media (min-width: 650px) {
        color: #fff;
    }
`;

const BurgerButton = styled.button<{ $open: boolean }>`
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1001;
    width: 40px;
    height: 40px;
    flex-direction: column;
    justify-content: space-between;
    background: none;
    border: none;
    cursor: pointer;
    background-color: ${(props) => (props.$open ? "var(--darkSpace10)" : "var(--darkSpace)")};
    border-radius: 40px;
    color: #fff;
    display: none;

    @media screen and (max-width: ${MediaWidth.Large}) {
        display: flex;
    }

    span {
        span {
            background-color: #fff;
            border-radius: 2px;
            display: block;
            height: 2px;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: 0.3s ease;
            transition-property: transform, opacity;
            width: 20px;
        }

        &.open span {
            background-color: var(--darkSpace);
        }

        & span:nth-child(1) {
            transform: translate(-50%, -50%) translateY(-6px);
        }
        & span:nth-child(2) {
        }
        & span:nth-child(3) {
            transform: translate(-50%, -50%) translateY(6px);
        }

        &.open span:nth-child(1) {
            transform: translateX(-50%) rotate(45deg);
        }
        &.open span:nth-child(2) {
            opacity: 0;
        }
        &.open span:nth-child(3) {
            transform: translateX(-50%) rotate(-45deg);
        }
    }
`;

export const Styled = {
    GlobalStyle,
    Page,
    Header,
    HeaderBox,
    HeaderLogo,
    HeaderLogoLink,
    HeaderActions,
    HeaderNav,
    HeaderNavLink,
    HeaderButtonsBox,
    IntroSection,
    IntroImageBox,
    IntroTitleBox,
    IntroTitleWrapper,
    IntroHeader,
    IntroHeaderTitle,
    IntroActionWrapper,
    LinkButton,
    HeaderButton,
    OpportunitiesSection,
    OpportunitiesHeader,
    OpportunitiesList,
    OpportunitiesItem,
    OpportunitiesItemImage,
    OpportunitiesItemText,
    OpportunitiesItemTextHdr,
    OpportunitiesItemTextTitle,
    OpportunitiesAction,
    Tabs,
    TabHeaders,
    TabHeaderBox,
    TabHeader,
    TabContent,
    TabContentItem,
    TabContentText,
    TabContentTextList,
    TabContentTextListItem,
    LinkButtonSmall,
    TabContentTextBtnBox,
    FaqSection,
    FaqSectionHeader,
    FaqHeader,
    FaqBody,
    FaqAccordiinTitle,
    BurgerButton,
    MobileTabsBox,
};
