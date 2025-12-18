import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const snowFall = keyframes`
  0% {
    transform: translateY(-10vh);
  }
  100% {
    transform: translateY(100vh);
  }
`;

export const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
`;

interface SnowflakeProps {
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: string;
  size: string;
}

export const Snowflake = styled.div<SnowflakeProps>`
  position: absolute;
  top: -10vh;
  left: ${({ left }) => left};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: white;
  border-radius: 50%;
  opacity: ${({ opacity }) => opacity};
  animation: ${snowFall} linear infinite;
  animation-duration: ${({ animationDuration }) => animationDuration};
  animation-delay: ${({ animationDelay }) => animationDelay};
`;
