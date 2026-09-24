import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Styled } from "./modal.styles";
import Spinner from "../Spinner";

interface ModalProps {
    headerTite?: string;
    text?: string | React.ReactNode;
    isOpen: boolean;
    isLoading?: boolean;
    wide?: boolean;
    onClose: () => void;
    children: React.ReactNode;
    isMobile: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
    const { headerTite, text, isOpen: openState, isLoading = false, onClose, children, isMobile, wide = false } = props;

    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(openState);
    }, [openState]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10); // Slight delay to trigger animation
        } else {
            setIsAnimating(false);
            const timeout = setTimeout(() => setIsVisible(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return ReactDOM.createPortal(
        <Styled.Modal onClick={onClose} className={isAnimating ? "fade-in" : "fade-out"}>
            <Styled.ModalBg onClick={onClose} />
            <Styled.Wrapper>
                <Styled.Box $isMobile={isMobile}>
                    {isLoading && <Spinner />}
                    <Styled.Body $isMobile={isMobile} onClick={(e) => e.stopPropagation()}>
                        <Styled.ModalCloseBtn onClick={onClose}>
                            <Styled.ModalCloseBtnContent>&times;</Styled.ModalCloseBtnContent>
                        </Styled.ModalCloseBtn>
                        <Styled.Section $wide={wide}>
                            {!isLoading && (
                                <>
                                    <Styled.Header>{headerTite}</Styled.Header>
                                    <Styled.BodyTitleContainer>{text}</Styled.BodyTitleContainer>
                                    <Styled.BodyBtnContainer>{children}</Styled.BodyBtnContainer>
                                </>
                            )}
                        </Styled.Section>
                    </Styled.Body>
                </Styled.Box>
            </Styled.Wrapper>
            <Styled.GlobalStyle $isMobile={isMobile} />
        </Styled.Modal>,
        document.getElementById("modal-root")!
    );
};

export default Modal;
