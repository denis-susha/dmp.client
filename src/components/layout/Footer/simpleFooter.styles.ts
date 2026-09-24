import styled from "styled-components";

const Footer = styled.footer`
    background-color: rgba(204, 214, 228, 0.6);
    flex-wrap: wrap;
    font-family: var(--mainFont);
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 1472px;
    padding: 24px 28px;
    width: 100%;

    @media ${({ theme }) => theme.media.sm} {
        flex-direction: column;
        align-items: center;
    }
`;

const Body = styled.div`
    display: flex;
    align-items: baseline;
`;

const Title = styled.div`
    margin-left: 1rem;
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
    font-size: 0.85rem;
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

export const Styled = {
    Footer,
    Wrapper,
    Body,
    Title,
    LanguageButton,
    LanguageButtonContainer,
};
