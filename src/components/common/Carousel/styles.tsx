import { Colors } from "@/styles/colors";
import theme from "@/styles/theme";
import styled, { css } from "styled-components";

interface IImgPointerProps {
    $isActive: boolean;
}

const ImgPointerBase = styled.div`
    width: 0.625rem;
    height: 0.625rem;
    margin-left: 0.375rem;
    margin-right: 0.375rem;
    border-radius: 9999px;
    cursor: pointer;
`;

const ImgPointer = styled(ImgPointerBase)<IImgPointerProps>`
    background-color: ${(props) => (props.$isActive ? theme.colors["primary"] : Colors.gray200)};
    border: 1px solid rgba(0, 48, 120, 0.2);
`;

const PointersContainer = styled.div`
    position: absolute;
    bottom: 0.625rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
`;

const Array = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    z-index: 100;
`;

const LeftArray = styled(Array)`
    left: 0.625rem;
`;

const RightArray = styled(Array)`
    right: 0.625rem;
`;

const CarouselContainer = styled.div<{ $isBanner: boolean }>`
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 300px;
    overflow: hidden;

    .image {
        position: absolute;
        height: 100%;
        width: auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        will-change: transform, opacity;

        &:hover {
            cursor: pointer;
        }

        &:active {
            cursor: grabbing;
        }
    }

    ${(props) =>
        props.$isBanner &&
        css`
            @media ${({ theme }) => theme.media.md} {
                height: 200px;
            }

            @media ${({ theme }) => theme.media.sm} {
                height: 180px;
                img {
                    object-position: 20% 100%;
                }
            }

            @media ${({ theme }) => theme.media.xs} {
                height: 160px;
            }
        `};
`;

const Image = styled.img`
    width: 100%;
`;

export const Styled = {
    ImgPointer,
    PointersContainer,
    LeftArray,
    RightArray,
    CarouselContainer,
    Image,
};
