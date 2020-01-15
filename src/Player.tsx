import React from "react";
import styled from "styled-components";
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind, MdReplay, MdStop } from "react-icons/md";

interface Props {
  isPlaying: boolean;
  canPlayOrPause: boolean;
  canStop: boolean;
  canForward: boolean;
  canBackward: boolean;
  progress: number;
  onClickPlay: () => void;
  onClickStop: () => void;
  onClickForward: () => void;
  onClickBackward: () => void;
}
const Player: React.FC<Props> = props => {
  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Button disabled={!props.canBackward} onClick={props.onClickBackward}>
          <MdFastRewind />
        </Button>
        <Button disabled={!props.canPlayOrPause} onClick={props.onClickPlay}>
          {props.isPlaying ? <MdPause /> : <MdPlayArrow />}
        </Button>
        <Button disabled={!props.canForward} onClick={props.onClickForward}>
          <MdFastForward />
        </Button>
        <Button disabled={!props.canStop} onClick={props.onClickStop}>
          <MdStop />
        </Button>
      </div>
      <div style={{ height: "5px", width: "500px", backgroundColor: "gray", borderRadius: "2px" }}>
        <div
          style={{
            transition: "all 300ms",
            height: "100%",
            width: `${props.progress}%`,
            backgroundColor: "silver",
            borderRadius: "2px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Player;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  margin: 0px 10px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.5;
  }
`;
