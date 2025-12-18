import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

const blink = keyframes`
  0%, 100% { background-color: ${colors[0]}; box-shadow: 0 0 7px 3px ${colors[0]}; }
  16% { background-color: ${colors[1]}; box-shadow: 0 0 7px 3px ${colors[1]}; }
  32% { background-color: ${colors[2]}; box-shadow: 0 0 7px 3px ${colors[2]}; }
  48% { background-color: ${colors[3]}; box-shadow: 0 0 7px 3px ${colors[3]}; }
  64% { background-color: ${colors[4]}; box-shadow: 0 0 7px 3px ${colors[4]}; }
  80% { background-color: ${colors[5]}; box-shadow: 0 0 7px 3px ${colors[5]}; }
`

export const TreeContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 300px;
  z-index: 1000;
`

const starBlink = keyframes`
  0%, 100% { box-shadow: 0 0 10px 5px yellow; opacity: 0.7; }
  50% { box-shadow: 0 0 20px 10px yellow; opacity: 1; }
`

export const Star = styled.div`
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid yellow;
  z-index: 1001;
  animation: ${starBlink} 2s infinite;
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: -15px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 25px solid yellow;
  }
`

export const Trunk = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 40px;
  background-color: #5c2e00;
`

export const Branch = styled.div<{ size: number; top: number; zIndex: number }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: ${({ top }) => top}px;
  width: 0;
  height: 0;
  border-left: ${({ size }) => size / 2}px solid transparent;
  border-right: ${({ size }) => size / 2}px solid transparent;
  border-bottom: ${({ size }) => size}px solid #0a5c0a;
  z-index: ${({ zIndex }) => zIndex};

  &::after {
    content: '';
    position: absolute;
    top: ${({ size }) => size / 10}px;
    left: -${({ size }) => size / 2 - size / 10}px;
    width: ${({ size }) => size - size / 5}px;
    height: ${({ size }) => size / 5}px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.8;
  }
`

export const GarlandLight = styled.div<{ top: number; left: number; colorIndex: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: ${blink} 4s infinite;
  animation-delay: ${({ colorIndex }) => colorIndex * 0.5}s;
  z-index: 5;
`
