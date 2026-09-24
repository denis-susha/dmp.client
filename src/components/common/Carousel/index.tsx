import React, { useState, useEffect, useCallback, FC, useRef } from "react";
import { Styled } from "./styles";
import { AnimatePresence, motion, PanInfo, Transition } from "framer-motion";
import Image from "next/image";
import { ImageItem } from "../ImageGallery/imageGallery";

const sliderVariants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        scale: 1.2,
        opacity: 0,
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        scale: 1,
        opacity: 0.2,
    }),
};

const sliderTransition: Transition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
};

interface CarouselProps {
    images: ImageItem[];
    isBanner: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    isMobile?: boolean;
    setActiveIndex?: (index: number) => void;
}
// Based on https://codesandbox.io/p/sandbox/framer-motion-image-carousel-m30oe
const Carousel: FC<CarouselProps> = ({
    images,
    isBanner,
    autoPlay = true,
    autoPlayInterval = 3000,
    isMobile = false,
    setActiveIndex,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const wasDragging = useRef(false);

    const startInterval = useCallback(() => {
        if (autoPlay) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }, autoPlayInterval);
        }
    }, [autoPlay, autoPlayInterval, images.length]);

    const handlePrevClick = useCallback(() => {
        setDirection(-1);

        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        startInterval(); // Reset interval on manual navigation
    }, [images.length, startInterval]);

    const handleNextClick = useCallback(() => {
        setDirection(1);

        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        startInterval(); // Reset interval on manual navigation
    }, [images.length, startInterval]);

    useEffect(() => {
        startInterval();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startInterval]);

    const handlePointerDown = () => {
        wasDragging.current = false;
    };

    const handlePointerMove = () => {
        wasDragging.current = true;
    };

    const onImageClick = (e: React.MouseEvent) => {
        if (wasDragging.current) {
            e.preventDefault(); // Prevent navigation on drag
        } else {
            if (isBanner) {
                window.open(images[currentIndex].link, "_blank");
            } else {
                if (setActiveIndex) {
                    setActiveIndex(images[currentIndex].id);
                }
            }
        }
    };

    const dragEndHandler = (dragInfo: PanInfo) => {
        const draggedDistance = dragInfo.offset.x;
        const swipeThreshold = 50;
        if (draggedDistance > swipeThreshold) {
            handlePrevClick();
        } else if (draggedDistance < -swipeThreshold) {
            handleNextClick();
        }
    };

    return (
        <Styled.CarouselContainer $isBanner={isBanner}>
            <AnimatePresence custom={direction}>
                <motion.div
                    key={currentIndex}
                    style={{
                        width: "100%",
                    }}
                    custom={direction}
                    variants={sliderVariants}
                    initial="incoming"
                    animate="active"
                    exit="exit"
                    transition={sliderTransition}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                    className="image"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onClick={onImageClick}
                >
                    <Image
                        src={images[currentIndex].src}
                        fill
                        alt={images[currentIndex].alt}
                        loading="eager"
                        fetchPriority="high"
                        style={{ objectFit: "cover" }}
                    />
                </motion.div>
            </AnimatePresence>
            {!isMobile && (
                <>
                    <Styled.LeftArray onClick={handlePrevClick}>❮</Styled.LeftArray>
                    <Styled.RightArray onClick={handleNextClick}>❯</Styled.RightArray>
                </>
            )}
            <Styled.PointersContainer>
                {images.map((_, index) => (
                    <Styled.ImgPointer
                        $isActive={index === currentIndex}
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </Styled.PointersContainer>
        </Styled.CarouselContainer>
    );
};

export default Carousel;
