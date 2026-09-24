import Link from "next/link";
import styled from "styled-components";

const ContentContainer = styled.div`
    align-items: center;
    flex-direction: column;
    display: flex;
`;

const ContentWrapper = styled.div`
    padding-top: 1.5rem;
    border-color: rgb(229 231 235/1);
    border-top-width: 1px;
    width: 100%;
    margin-top: 1.5rem;
    font-size: 1.125rem;
    color: #374151;

    h3 {
        font-size: 1.5em;
        font-weight: 700;
        line-height: 1.3333333;
        margin-bottom: 1em;
        margin-top: 2em;
    }

    h4 {
        font-size: 1.1em;
        font-weight: 700;
        line-height: 1.3333333;
        margin-bottom: 1em;
        margin-top: 1.75em;
    }

    p {
        margin-bottom: 1.5rem;
    }

    ul {
        margin-left: 1.5rem;
        margin-bottom: 1.5rem;
        list-style: inside;
    }

    a {
        color: #005bff;
        text-decoration: underline;
    }

    img {
        border-radius: 0.55rem;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        border: rgb(229 231 235/1) solid 1px;
    }

    ol {
        margin-left: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;

const LinkToMain = styled(Link)`
    color: #005bff;
    font-size: 1.125rem;
`;

const ArticleHeader = styled.div`
    gap: 1.5rem;
    flex-direction: column;
    display: flex;
    color: inherit;
    text-decoration: inherit;

    img {
        border-radius: 0.75rem;
    }
`;

export const Styled = {
    ContentContainer,
    ContentWrapper,
    LinkToMain,
    ArticleHeader,
};
