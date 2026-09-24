import styled from "styled-components";
import Button from "../Button";

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    margin-top: -50px;
`;

const NotFoundTitle = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

const NotFoundSubtitle = styled.h6`
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    &:hover {
        background-color: #0056b3;
    }
`;

export const Styles = {
    NotFoundContainer,
    NotFoundTitle,
    NotFoundSubtitle,
    StyledButton,
};
