import React from "react";
import styled from "styled-components";
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind, MdReplay } from "react-icons/md";

interface Props {
  status: "PLAYING" | "PAUSED" | "FINISHED";
  progress: number;
  onClickPlay: () => void;
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
        <Button style={{ display: "flex", justifyContent: "center" }}>
          <MdFastRewind size={30} />
        </Button>
        <Button onClick={props.onClickPlay} style={{ display: "flex", justifyContent: "center" }}>
          {props.status === "PLAYING" && <MdPause size={30} />}
          {props.status === "PAUSED" && <MdPlayArrow size={30} />}
          {props.status === "FINISHED" && <MdReplay size={30} />}
        </Button>
        <Button style={{ display: "flex", justifyContent: "center" }}>
          <MdFastForward size={30} />
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
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  margin: 0px 10px;
  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.5;
  }
`;
