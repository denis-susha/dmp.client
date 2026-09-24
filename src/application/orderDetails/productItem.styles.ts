import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 8px;
`;

const StoreContainer = styled.div`
    color: rgba(0, 26, 52, 0.6);
    margin-top: 8px;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const ItemContainer = styled.div`
    display: flex;
    overflow: hidden;
    padding: 20px 0;
    position: relative;
`;

const ImgContainer = styled.div`
    border-radius: 16px;
    cursor: pointer;
    height: 72px;
    width: 72px;
    align-items: center;
    background-color: #fff;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    overflow: hidden;
    position: relative;
`;

const Img = styled(Image)`
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
`;

const ImgBg = styled.div`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 48, 120, 0.039);
`;

const DescriptionCpntainer = styled.div`
    align-items: center;
    flex-wrap: wrap;
    margin-left: 16px;
    display: flex;
    flex-grow: 1;
`;

const DescriptionWraper = styled.div`
    display: flex;
    width: 100%;
`;

const DescriptionColumn = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-right: 16px;
`;

const DescriptionPriceRow = styled.div`
    margin-bottom: 2px;
    color: #070707;
    display: inline-flex;
    position: relative;
    max-width: 100%;
`;

const DescriptionPriceWrapper = styled.div`
    overflow: hidden;
    display: inline-flex;
    position: relative;
`;

const DescriptionPriceValue = styled.span`
    margin-right: 4px;
    color: rgba(7, 7, 7, 1);
    display: inline;
    white-space: nowrap;
`;

const DescriptionNameRow = styled.div`
    color: rgba(7, 7, 7, 1);
    cursor: pointer;
    margin-bottom: 2px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    word-break: break-word;
`;

const DescriptionDetailsRow = styled.div`
    color: rgba(0, 26, 52, 0.6);
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    word-break: break-word;
`;

export const Styled = {
    Container,
    StoreContainer,
    ItemContainer,
    ImgContainer,
    Img,
    ImgBg,
    DescriptionCpntainer,
    DescriptionWraper,
    DescriptionColumn,
    DescriptionPriceRow,
    DescriptionPriceWrapper,
    DescriptionPriceValue,
    DescriptionNameRow,
    DescriptionDetailsRow,
};
