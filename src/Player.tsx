import React from "react";
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind, MdStop } from "react-icons/md";

import Button from "./components/Button";

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
        <Button rounded disabled={!props.canBackward} onClick={props.onClickBackward}>
          <MdFastRewind />
        </Button>
        <Button rounded disabled={!props.canPlayOrPause} onClick={props.onClickPlay}>
          {props.isPlaying ? <MdPause /> : <MdPlayArrow />}
        </Button>
        <Button rounded disabled={!props.canForward} onClick={props.onClickForward}>
          <MdFastForward />
        </Button>
        <Button rounded disabled={!props.canStop} onClick={props.onClickStop}>
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
