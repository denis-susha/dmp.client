import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const AnimatedBox = styled.div<{ $visible: boolean }>`
    animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
    display: ${({ $visible }) => ($visible ? "block" : "none")};
    z-index: 600;
`;

export const Styled = {
    AnimatedBox,
};
