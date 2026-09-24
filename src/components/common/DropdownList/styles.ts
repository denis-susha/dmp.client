import styled from "styled-components";
import Icon from "../Icon";

const ArrowsContainer = styled.div`
    pointer-events: none;
    align-items: center;
    display: flex;
    position: absolute;
    right: 10px;
`;

const ArrowsIcon = styled(Icon)`
    color: rgba(0, 26, 52, 0.6);
    margin-left: 4px;
    min-width: 24px;
`;

const SearchResultsSortInputWrapper = styled.div`
    width: 100%;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px rgba(204, 214, 228, 0.6);
    box-sizing: border-box;
    color: #070707;
    cursor: pointer;
    display: flex;
    height: 44px;
    width: 100%;
    min-width: 120px;
    position: relative;

    &:hover {
        box-shadow: inset 0 0 0 1px rgba(0, 26, 52, 0.4);
    }

    &.active {
        box-shadow: inset 0 0 0 2px #005bff;
    }
`;

const SearchResultsSortInput = styled.input`
    padding-right: 32px;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    padding: 10px 16px;
    text-overflow: ellipsis;
    width: 100%;
    font-family: var(--mainFont);
    font-style: normal;
    text-decoration: none;
    text-transform: none;
    word-spacing: normal;
`;

const DropdownList = styled.div`
    min-width: 230px;
    max-width: 230px;
    border-radius: 8px;
    position: relative;
    inset: 0px auto auto 0px;
    margin: 0px;
    opacity: 1;

    background-color: transparent;
    box-shadow: 0 4px 16px 0 rgba(0, 26, 52, 0.06);
    box-sizing: border-box;
    transition: opacity 0.5s;
    will-change: transform;
    z-index: 1000;
`;

const DropdownListWrapper = styled.div`
    left: 0;
    top: calc(100% + 8px);
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    max-height: 250px;
    background-color: #fff;
    box-shadow: 0 4px 16px 0 rgba(0, 26, 52, 0.06);
    box-sizing: border-box;
    overflow-y: auto;
    position: absolute;
`;

const ChildContainer = styled.div`
    padding-left: 12px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    width: auto;

    &:hover {
        background-color: rgba(0, 48, 120, 0.04);
    }
`;

const ChildLabel = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    display: flex;
`;

const ChildLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ChildLabelBox = styled.div`
    color: #070707;
`;

const Selected = styled.div`
    padding: 8px 12px 8px 8px;
    align-items: center;
    display: flex;
`;

const SelectedContainer = styled.div`
    align-items: center;
    display: flex;
`;

const SelectedWrapper = styled.div`
    color: rgb(7, 7, 7);
    height: 24px;
    width: 24px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-family: var(--mainFont);
    justify-content: center;
    position: relative;
    vertical-align: top;
`;

const SelectedIcon = styled(Icon)`
    color: rgb(0, 91, 255);
`;

export const Styled = {
    ArrowsContainer,
    ArrowsIcon,
    SearchResultsSortInputWrapper,
    SearchResultsSortInput,
    DropdownList,
    DropdownListWrapper,
    ChildContainer,
    ChildLabel,
    ChildLabelWrapper,
    ChildLabelBox,
    Selected,
    SelectedContainer,
    SelectedWrapper,
    SelectedIcon,
};
