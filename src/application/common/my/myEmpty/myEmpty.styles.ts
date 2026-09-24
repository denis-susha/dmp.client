import styled from "styled-components";

const NoOrders = styled.div`
    align-items: center;
    justify-content: center;
    height: fit-content;
    box-sizing: border-box;
    width: 100%;
    display: flex;
`;

const Wrapper = styled.div`
    flex-direction: column;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
`;

const ImageBox = styled.div`
    padding-bottom: 8px;
    width: 168px;
    height: 168px;
    border-radius: 0px;
    align-items: center;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
`;

const TitlesWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleHeader = styled.div`
    color: rgba(7, 7, 7, 1);
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 8px;
    justify-content: center;
    text-align: center;
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

const Title = styled.div`
    color: rgba(0, 26, 52, 0.6);
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
    justify-content: center;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const BtnBox = styled.div`
    width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
`;

export const Styled = {
    NoOrders,
    Wrapper,
    ImageBox,
    TitlesWrapper,
    TitleHeader,
    Title,
    BtnBox,
};
