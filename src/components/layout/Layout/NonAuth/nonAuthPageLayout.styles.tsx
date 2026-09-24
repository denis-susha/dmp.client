import { appConfig } from "@/appConfig";
import Image from "next/image";
import styled, { css } from "styled-components";

const Layout = styled.div<{ $isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    min-width: ${(props) => (props.$isMobile ? "initial" : "var(--desktop-screen-s)")};
    max-width: ${(props) => (props.$isMobile ? "100vw" : "initial")};
    min-height: 100vh;
    position: relative;
`;

const Container = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const ContainerBg = styled.div`
    background-image: url(${appConfig.imagesHost}/static/f_bg.svg);
    background-position: 100% 0;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    width: 100%;
`;

const FormColumn = styled.div<{ $isMobile: boolean }>`
    box-sizing: border-box;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    max-width: 1472px;
    min-height: 100vh;
    position: relative;
    flex-wrap: wrap;

    ${(props) =>
        props.$isMobile &&
        css`
            padding: 24px;
            position: static;
        `};
`;

const FormBox = styled.div<{ $isMobile: boolean }>`
    background-color: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    margin: ${(props) => (props.$isMobile ? "40px 0 60px 0" : "110px 0 60px 0")};
    max-width: 416px;
    min-width: 280px;
    padding: 32px;
    width: 100%;
    box-sizing: border-box;

    @media ${({ theme }) => theme.media.sm} {
        margin: 40px 0 40px 0;
    }
`;

const LogoContainer = styled.div`
    border-radius: 12px;
    height: 30px;
    width: 130px;
`;

const LogoImg = styled(Image)`
    object-fit: contain;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    border: none;
    outline: none;
`;

const SectionContent = styled.div``;

const Box = styled.div`
    padding: 0 4px;
`;

const HdrContainer = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const HdrTitle = styled.span`
    padding-bottom: 16px;
    padding-top: 40px;
    line-height: 32px;
`;

const TitleContainer = styled.div`
    font-size: 16px;
    letter-spacing: 0.2px;
    line-height: 24px;
    margin-bottom: 28px;
`;

const InputContainer = styled.div`
    margin-bottom: 20px;
`;

const TurnstileWidgetContainer = styled(InputContainer)`
    width: 100%;
`;

const SubmitBtnTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

const SubmitBtnTitleContainer = styled.div`
    display: flex;
    height: 24px;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const SubmitBtnBg = styled.div`
    background-color: #fff;
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    &:hover {
        opacity: 0.1;
    }
`;

const CornerFunctionsContainer = styled.div<{ $isMobile: boolean }>`
    text-align: right;
    display: flex;
    gap: ${(props) => (props.$isMobile ? "initial" : "32px")};
    justify-content: end;
    flex-wrap: ${(props) => (props.$isMobile ? "wrap" : "nowrap")};
    width: 100%;

    @media ${({ theme }) => theme.media.sm} {
        right: 0;
    }
`;

const CornerFunctionsRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;

    @media ${({ theme }) => theme.media.md} {
        flex-wrap: wrap;
        width: 100%;
        justify-content: end;
        margin-right: 0px;
    }

    @media ${({ theme }) => theme.media.xs} {
        padding: 0 10px;
    }
`;

const LogInActionContainer = styled.div`
    margin-left: 5px;
`;

const LogInAction = styled.a`
    align-items: center;
    display: flex;
    height: 32px;
    text-decoration: none;
    color: #005bff;
`;

const LogInActionSeparator = styled.span`
    margin-left: 5px;
`;

const MessageBox = styled(TitleContainer)`
    margin-top: 15px;
`;

export const Styled = {
    Container,
    Layout,
    ContainerBg,
    FormColumn,
    FormBox,
    LogoContainer,
    LogoImg,
    SectionContent,
    Box,
    HdrContainer,
    HdrTitle,
    TitleContainer,
    InputContainer,
    SubmitBtnTitle,
    SubmitBtnTitleContainer,
    SubmitBtnBg,
    CornerFunctionsContainer,
    LogInAction,
    CornerFunctionsRow,
    LogInActionContainer,
    LogInActionSeparator,
    MessageBox,
    TurnstileWidgetContainer,
};
