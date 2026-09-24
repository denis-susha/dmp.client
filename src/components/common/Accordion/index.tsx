import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Styled } from "./accordion.styles";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen((prev) => !prev);

    return (
        <Styled.AccordionContainer>
            <Styled.Header onClick={toggleAccordion}>
                <Styled.Title>{title}</Styled.Title>
                <Styled.Indicator $isOpen={isOpen}>{isOpen ? "−" : "+"}</Styled.Indicator>
            </Styled.Header>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <Styled.ContentWrapper
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Styled.Content>{children}</Styled.Content>
                    </Styled.ContentWrapper>
                )}
            </AnimatePresence>
        </Styled.AccordionContainer>
    );
};

export default Accordion;
