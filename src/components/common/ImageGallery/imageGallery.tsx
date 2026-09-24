import Image from "next/image";
import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";

export interface ImageItem {
    id: number;
    src: string;
    alt: string;
    thumbnailSrc?: string;
    link?: string;
}

export interface ImageGalleryProps {
    images: ImageItem[];
    setActiveIndex: (index: number) => void;
    className?: string;
}

const GalleryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ThumbnailList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-shrink: 0;
    width: 56px;
    overflow-y: auto;
    max-height: 400px;

    @media (max-width: 768px) {
        flex-direction: row;
        overflow-y: hidden;
        overflow-x: auto;
        width: 100%;
        max-height: none;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #eee;
        margin-bottom: 1rem;
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(204, 214, 228, 0.6);
    }

    &::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-track {
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

interface ThumbnailItemProps {
    $isActive: boolean;
}

const ThumbnailItem = styled.button<ThumbnailItemProps>`
    padding: 0;
    border: 2px solid transparent;
    background-color: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition:
        border-color 0.2s ease-in-out,
        opacity 0.2s ease-in-out;
    opacity: 0.7;
    margin-right: 1px;

    img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }

    &:hover {
        opacity: 1;
    }

    ${({ $isActive }) =>
        $isActive &&
        css`
            border-color: #007bff;
            opacity: 1;
        `}

    @media (max-width: 768px) {
        width: 70px;
        height: 70px;
        flex-shrink: 0;
        img {
            height: 100%;
        }
    }
`;

const MainImageWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    min-width: 0;
`;

const MainImage = styled(Image)`
    display: block;
    max-height: 400px;
    width: auto;
    object-fit: contain;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    padding: 3px;

    &:hover {
        /* Optional: subtle hover effect */
        transform: scale(1.02);
    }
`;

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className, setActiveIndex }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const selectedImage = useMemo(() => {
        if (images && images.length > selectedIndex) {
            return images[selectedIndex];
        }
        return null;
    }, [images, selectedIndex]);

    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handleOpenFullScreen = () => {
        if (selectedImage) {
            setActiveIndex(selectedImage.id);
        }
    };

    // Handle empty or invalid images array
    if (!images || images.length === 0) {
        return <GalleryWrapper className={className}>No images to display.</GalleryWrapper>;
    }

    if (!selectedImage) {
        if (selectedIndex !== 0) setSelectedIndex(0);
        if (!images[0]) {
            return <GalleryWrapper className={className}>Error loading images.</GalleryWrapper>;
        }
        return null; // Render nothing briefly while state resets if needed
    }

    return (
        <>
            <GalleryWrapper className={className}>
                <ThumbnailList>
                    {images.map((image, index) => (
                        <ThumbnailItem
                            key={image.id}
                            $isActive={index === selectedIndex}
                            onClick={() => handleThumbnailClick(index)}
                            aria-label={`View image ${index + 1}: ${image.alt}`}
                            title={image.alt}
                        >
                            <Image
                                width={56}
                                height={100}
                                src={image.thumbnailSrc || image.src}
                                alt={`Thumbnail for ${image.alt}`}
                                priority={true}
                            />
                        </ThumbnailItem>
                    ))}
                </ThumbnailList>

                <MainImageWrapper>
                    <MainImage
                        width={355}
                        height={400}
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        loading="eager"
                        priority={true}
                        onClick={handleOpenFullScreen} // Open fullscreen on click
                    />
                </MainImageWrapper>
            </GalleryWrapper>
        </>
    );
};
