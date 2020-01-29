import React, { useState, useRef } from "react";
import _ from "lodash";
import { IconContext } from "react-icons";

import { generateData } from "./utils";
import { bubbleSort } from "./sorting-algos";
import Board from "./Board";
import Player from "./Player";
import { DataSet } from "./interfaces";
import Button from "./components/Button";

const App: React.FC = () => {
  const displayIntervalId = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataSet, setDataSet] = useState(generateData(10, 30));
  const [sortingMovements, setSortingMovements] = useState<
    { movements: DataSet[]; displayedIndex: number } | undefined
  >(undefined);

  const handleGenerateData = () => {
    const amount = _.random(10, 30);
    const maxValue = _.random(20, 30);

    stopPlaying();
    setDataSet(generateData(amount, maxValue));
    setSortingMovements(undefined);
  };

  const handlePlayClicked = () => {
    if (sortingMovements === undefined) {
      setSortingMovements({
        movements: bubbleSort(dataSet),
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
    setSortingMovements(undefined);
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
    setSortingMovements(prevState => {
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
    setSortingMovements(prevState => {
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

  const canPlayOrPause = !(
    sortingMovements && sortingMovements.displayedIndex >= sortingMovements.movements.length - 1
  );
  const canStop = sortingMovements !== undefined;
  const canForward =
    sortingMovements !== undefined && sortingMovements.displayedIndex < sortingMovements.movements.length - 1;
  const canBackward = sortingMovements !== undefined && sortingMovements!.displayedIndex > 0;
  const progress = sortingMovements
    ? (sortingMovements.displayedIndex / (sortingMovements.movements.length - 1)) * 100
    : 0;

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
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleGenerateData} style={{ padding: 10, fontSize: "1em" }}>
              GENERATE NEW DATA
            </Button>
          </div>
          <div style={{ backgroundColor: "green", flex: 5 }}>123</div>
        </div>
        <div style={{ flex: 5, padding: "20px 40px" }}>
          <Board dataSet={sortingMovements ? sortingMovements.movements[sortingMovements.displayedIndex] : dataSet} />
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
