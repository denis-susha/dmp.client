import { motion } from "framer-motion";
import styled from "styled-components";

const AccordionContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin: 1rem 0;
    overflow: hidden;
`;

const Header = styled.div`
    background: inherit;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
`;

const Title = styled.div`
    font-size: inherit;
    font-weight: bold;
`;

const Indicator = styled.div<{ $isOpen: boolean }>`
    font-size: 2.2rem;
    transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
    transition: transform 0.2s ease;
`;

const ContentWrapper = styled(motion.div)`
    overflow: hidden;
`;

const Content = styled.div`
    padding: 1rem;
    background: inherit;
    border-top: 1px solid inherit;
`;

export const Styled = {
    AccordionContainer,
    Header,
    Title,
    Indicator,
    ContentWrapper,
    Content,
};
