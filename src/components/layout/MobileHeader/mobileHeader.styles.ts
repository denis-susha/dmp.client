import styled from "styled-components";

const Header = styled.header`
    overflow-y: unset;
    overflow-x: clip;
    display: block;
    font-size: 1rem;
    position: unset;
    box-shadow: unset;
    border: unset;
    height: auto;
    overflow: unset;
`;

const ToolbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-top: 0.643rem;
`;

const LeftPart = styled.div`
    display: flex;
    margin-left: 1.8rem;
`;

const LogoWrapper = styled.div`
    margin-left: 1rem;
`;

const RightPart = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    box-sizing: unset;
    margin-right: 1.1rem;
`;

const HeaderActionAccountWrapper = styled.div`
    cursor: pointer;
`;

const HeaderActionAccount = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
`;

const HeaderActionNameBox = styled.div`
    display: inline-flex;
`;

const HeaderAction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    box-sizing: border-box;
    color: #070707;
    padding-top: 0.5rem;
    position: relative;
    width: 50px;
`;

export const Styled = {
    Header,
    ToolbarWrapper,
    LeftPart,
    RightPart,
    HeaderActionAccountWrapper,
    HeaderActionAccount,
    HeaderActionNameBox,
    HeaderAction,
    LogoWrapper,
};
