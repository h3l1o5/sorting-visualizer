import React, { useState, useRef } from "react";
import _ from "lodash";
import { IconContext } from "react-icons";

import { generateData, colors } from "./utils";
import { bubbleSort } from "./sorting-algos";
import Board from "./Board";
import Player from "./Player";
import { DataSet, Legend } from "./interfaces";
import Button from "./components/Button";

const App: React.FC = () => {
  const displayIntervalId = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataSet, setDataSet] = useState(generateData(_.random(10, 50), 50));
  const [sortingStatus, setSortingStatus] = useState<
    { legends: Legend[]; movements: DataSet[]; displayedIndex: number } | undefined
  >(undefined);

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
      startPlaying();
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

  const startPlaying = () => {
    setIsPlaying(true);
    displayIntervalId.current = setInterval(() => {
      stepForward();
    }, 300);
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
            <Button color={colors.white} onClick={handleGenerateData} style={{ padding: 10, fontSize: "1em" }}>
              GENERATE NEW DATA
            </Button>
          </div>
          <div style={{ height: "50%", width: "2px", backgroundColor: "silver", alignSelf: "center" }}></div>
          <div style={{ flex: 5 }}></div>
        </div>
        <div style={{ flex: 5, padding: "20px 40px" }}>
          <Board
            maxValue={50}
            legends={sortingStatus ? sortingStatus.legends : []}
            dataSet={sortingStatus ? sortingStatus.movements[sortingStatus.displayedIndex] : dataSet}
          />
        </div>
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
      </div>
    </IconContext.Provider>
  );
};

export default App;
