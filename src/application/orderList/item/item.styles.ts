import styled from "styled-components";

const Item = styled.div`
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
    width: 100%;
`;

const ItemHdr = styled.div`
    background-color: #f5f7fa;
`;

const ItemHdrWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px 24px 18px;
`;

const ItemHdrLeft = styled.div`
    margin-right: 43px;
`;

const ItemHdrLeftTitle = styled.div`
    align-items: center;
    display: flex;
    min-height: 24px;
`;

const ItemHdrLeftLink = styled.div`
    display: flex;

    a {
        color: #005bff;
        display: block;
        font-size: 14px;
        line-height: 1.29;
        margin-right: 8px;
        margin-top: 4px;
        text-decoration: none;

        &:hover {
            color: #003ead;
        }
    }
`;

const ItemHdrRight = styled.div`
    flex-shrink: 0;
    margin-left: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
`;

const ItemHdrRightTitle = styled.div`
    align-items: baseline;
    display: flex;
`;

const ItemHdrRightTitleValue = styled.span`
    color: #070707;
    font-size: 14px;
    line-height: 1.29;
    white-space: pre-wrap;
`;

const ItemBody = styled.div`
    border-top: 1px solid #f5f7fa;
`;

const ItemBodyWrapper = styled.div`
    display: flex;
    padding: 16px 24px 24px;
    flex-wrap: wrap;
`;

const ItemBodyLeft = styled.div`
    cursor: auto;
    padding-right: 12px;
`;

const ItemBodyLeftTitle = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
`;

const ItemBodyLeftStatus = styled.span`
    margin-right: 8px;
`;

const ItemBodyRight = styled.div`
    margin-left: auto;
    margin-top: 1.5rem;
`;

export const Styled = {
    Item,
    ItemHdr,
    ItemHdrWrapper,
    ItemHdrLeft,
    ItemHdrLeftTitle,
    ItemHdrLeftLink,
    ItemHdrRight,
    ItemHdrRightTitle,
    ItemHdrRightTitleValue,
    ItemBody,
    ItemBodyWrapper,
    ItemBodyLeft,
    ItemBodyLeftTitle,
    ItemBodyLeftStatus,
    ItemBodyRight,
};
