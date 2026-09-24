import styled from "styled-components";

const TabHeaders = styled.div`
    display: flex;
    border-bottom: 2px solid #ccc;
`;

const TabHeader = styled.button<{ $isActive: boolean }>`
    padding: 10px 20px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
    border-bottom: ${(props) => (props.$isActive ? "2px solid #007bff" : "none")};
    color: ${(props) => (props.$isActive ? "#007bff" : "#000")};

    &:hover {
        color: #0056b3;
    }
`;

const TabContent = styled.div`
    padding: 20px;
`;

export const Styled = {
    TabHeaders,
    TabHeader,
    TabContent,
};
