import { MediaWidth } from "@/styles/common";
import Link from "next/link";
import styled, { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --darkSpace: #001a34;
    --darkSpace10: #eff3f6;
}


body {
    color: var(--darkSpace);
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
    background-color: #e5efff;
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
                margin-top: 4rem;
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
    padding-top: 5rem;

    @media ${({ theme }) => theme.media.md} {
        padding-top: 2rem;
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

const Container = styled.div`
    max-width: 1298px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
`;

const TopicContiner = styled.div`
    gap: 0.75rem;
    flex-direction: column;
    max-width: 50rem;
    display: flex;
`;

const TopicHeader = styled.h1`
    font-size: 3rem;
    line-height: 1.25;
    font-weight: 600;

    @media ${({ theme }) => theme.media.md} {
        font-size: 2rem;
    }
`;

const TopicTagsContainer = styled.div`
    gap: 0.5rem;
    flex-wrap: wrap;
    display: flex;
    margin-top: 1.5rem;

    @media ${({ theme }) => theme.media.md} {
        margin-top: 0.5rem;
    }
`;

const ContentSection = styled.section`
    margin-top: 3rem;
    padding-bottom: 5rem;
`;

const ContentWrapper = styled.div`
    gap: 5rem;
    flex-direction: row;
    display: flex;
`;

const Articles = styled.div`
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    display: grid;

    @media ${({ theme }) => theme.media.md} {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 3.5rem;
    }
`;

const Article = styled(Link)`
    gap: 1.5rem;
    flex-direction: column;
    display: flex;
    color: inherit;
    text-decoration: inherit;

    img {
        border-radius: 0.75rem;
        object-fit: cover;
    }
`;

const ArticleImageContainer = styled.div`
    height: 290px;
    width: 100%;
    position: relative;
`;

const ArticleTitlesWrapper = styled.div`
    gap: 0.5rem;
    flex-direction: column;
    display: flex;
`;

const ArticleDate = styled.div`
    color: rgb(75 85 99/1);
    font-size: 0.975rem;
    line-height: 1.25rem;

    .bull {
        margin-left: 4px;
        margin-right: 4px;
    }
`;

const ArticleHeader = styled.h2`
    font-weight: 600;
    font-size: 1.35rem;
    line-height: 1.25;
`;

const ArticleShortContent = styled.div`
    color: rgb(75 85 99/1);
    font-size: 0.975rem;
    line-height: 1.25rem;
`;

const Aside = styled.aside`
    width: 300px;
    grid-column-start: 10;
    order: 2;
    gap: 1.5rem;
    flex-direction: column;
    flex-shrink: 0;
    display: flex;

    @media ${({ theme }) => theme.media.lg} {
        display: none;
    }
`;

const TryItBox = styled.div`
    display: flex;
    padding: 1.5rem;
    background-color: #0e80f930;
    border-radius: 0.75rem;
    gap: 1rem;
    flex-direction: column;
`;

const TryItHeader = styled.h2`
    color: #005bff;
    font-weight: 500;
    font-size: 1.975rem;
    line-height: 1.25;
`;

const TryItText = styled.div`
    color: #005bff;
    font-size: 0.975rem;
    line-height: 1.25rem;
`;

export const Styled = {
    GlobalStyle,
    Page,
    Header,
    HeaderBox,
    HeaderLogo,
    HeaderLogoLink,
    HeaderActions,
    HeaderButtonsBox,
    IntroSection,
    HeaderButton,
    LinkButtonSmall,
    BurgerButton,
    Container,
    TopicContiner,
    TopicHeader,
    TopicTagsContainer,
    ContentSection,
    ContentWrapper,
    Articles,
    Article,
    ArticleImageContainer,
    ArticleTitlesWrapper,
    ArticleDate,
    ArticleHeader,
    ArticleShortContent,
    Aside,
    TryItBox,
    TryItHeader,
    TryItText,
};
