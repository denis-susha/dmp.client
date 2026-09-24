import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ImageItem } from "./imageGallery";
import { CommonStyles } from "@/styles/common";

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ImageContainer = styled(motion.div)`
    height: 90vh;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
    user-select: none;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
`;

const NavButton = styled.button`
    border: 1px solid rgba(0, 48, 120, 0.2);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    padding: 10px;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    &:hover {
        background: rgba(255, 255, 255, 0.4);
    }
`;

const PrevButton = styled(NavButton)`
    left: 20px;
`;

const NextButton = styled(NavButton)`
    right: 20px;
`;

export const FullPageOverlay: React.FC<{ images: ImageItem[]; activeIndex: number; onClose: () => void }> = ({
    images,
    activeIndex,
    onClose,
}) => {
    const [currentIndex, setCurrentIndex] = useState(activeIndex);

    const showPrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    const showNext = () => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft") showPrev();
            if (event.key === "ArrowRight") showNext();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <AnimatePresence>
            <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                <ImageContainer onClick={(e) => e.stopPropagation()}>
                    <Image src={images[currentIndex].src} alt={images[currentIndex].alt} />
                    <PrevButton onClick={showPrev}>‹</PrevButton>
                    <NextButton onClick={showNext}>›</NextButton>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ImageContainer>
            </Overlay>
            <CommonStyles.GlobalModalStyle />
        </AnimatePresence>
    );
};
