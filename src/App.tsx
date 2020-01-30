import React, { useState, useRef } from "react";
import _ from "lodash";
import { IconContext } from "react-icons";

import { generateData, colors, constants } from "./utils";
import { bubbleSort } from "./sorting-algos";
import Board from "./Board";
import Player from "./Player";
import { DataSet, Legend, Speed } from "./interfaces";
import Button from "./components/Button";

const App: React.FC = () => {
  const displayIntervalId = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataSet, setDataSet] = useState(generateData(_.random(10, 50), 50));
  const [sortingStatus, setSortingStatus] = useState<
    { legends: Legend[]; movements: DataSet[]; displayedIndex: number } | undefined
  >(undefined);
  const [speed, setSpeed] = useState<Speed>("NORMAL");

  const handleGenerateData = () => {
    stopPlaying();
    setDataSet(generateData(_.random(10, 50), 50));
    setSortingStatus(undefined);
  };

  const handlePlayClicked = () => {
    if (sortingStatus === undefined) {
      const sortingResult = bubbleSort(dataSet);
      setSortingStatus({
        movements: sortingResult.movements,
        legends: sortingResult.legends,
        displayedIndex: 0,
      });
    }

    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying(speed);
    }
  };

  const handleStopClicked = () => {
    stopPlaying();
    setSortingStatus(undefined);
  };

  const handleForwardClicked = () => {
    stopPlaying();
    stepForward();
  };

  const handleBackwardClicked = () => {
    stopPlaying();
    stepBackward();
  };

  const handleSpeedChanged = (nextSpeed: Speed) => {
    if (speed !== nextSpeed) {
      setSpeed(nextSpeed);

      if (isPlaying) {
        startPlaying(nextSpeed);
      }
    }
  };

  const stepForward = () => {
    setSortingStatus(prevState => {
      if (prevState === undefined) {
        return prevState;
      }

      const nextIndex = prevState.displayedIndex + 1;

      if (nextIndex === prevState.movements.length - 1) {
        stopPlaying();
      }

      return { ...prevState, displayedIndex: prevState.displayedIndex + 1 };
    });
  };

  const stepBackward = () => {
    setSortingStatus(prevState => {
      if (prevState === undefined) {
        return prevState;
      }

      if (prevState.displayedIndex > 0) {
        return { ...prevState, displayedIndex: prevState.displayedIndex - 1 };
      } else {
        return prevState;
      }
    });
  };

  const startPlaying = (speed: Speed) => {
    setIsPlaying(true);

    clearInterval(displayIntervalId.current);
    displayIntervalId.current = undefined;

    displayIntervalId.current = setInterval(() => {
      stepForward();
    }, constants.TIMER_DELAY[speed]);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    clearInterval(displayIntervalId.current);
    displayIntervalId.current = undefined;
  };

  const canPlayOrPause = !(sortingStatus && sortingStatus.displayedIndex >= sortingStatus.movements.length - 1);
  const canStop = sortingStatus !== undefined;
  const canForward = sortingStatus !== undefined && sortingStatus.displayedIndex < sortingStatus.movements.length - 1;
  const canBackward = sortingStatus !== undefined && sortingStatus!.displayedIndex > 0;
  const progress = sortingStatus ? (sortingStatus.displayedIndex / (sortingStatus.movements.length - 1)) * 100 : 0;

  return (
    <IconContext.Provider value={{ size: "2em", style: { verticalAlign: "middle" } }}>
      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleGenerateData} style={{ padding: 10, fontSize: "1em" }}>
              GENERATE NEW DATA
            </Button>
          </div>
          <div style={{ height: "50%", width: "2px", backgroundColor: "silver", alignSelf: "center" }}></div>
          <div style={{ flex: 5 }}></div>
        </div>
        <div style={{ flex: 5, padding: "10px 40px" }}>
          <Board
            maxValue={50}
            transitionDelay={isPlaying ? constants.TRANSITION_DELAY[speed] : "500ms"}
            legends={sortingStatus ? sortingStatus.legends : []}
            dataSet={sortingStatus ? sortingStatus.movements[sortingStatus.displayedIndex] : dataSet}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Player
              isPlaying={isPlaying}
              canPlayOrPause={canPlayOrPause}
              canStop={canStop}
              canForward={canForward}
              canBackward={canBackward}
              progress={progress}
              onClickPlay={handlePlayClicked}
              onClickStop={handleStopClicked}
              onClickForward={handleForwardClicked}
              onClickBackward={handleBackwardClicked}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1em", color: colors.white }}>SPEED</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button style={{ padding: 10 }} selected={speed === "SLOW"} onClick={() => handleSpeedChanged("SLOW")}>
                SLOW
              </Button>
              <Button
                style={{ padding: 10 }}
                selected={speed === "NORMAL"}
                onClick={() => handleSpeedChanged("NORMAL")}
              >
                NORMAL
              </Button>
              <Button style={{ padding: 10 }} selected={speed === "FAST"} onClick={() => handleSpeedChanged("FAST")}>
                FAST
              </Button>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default App;
