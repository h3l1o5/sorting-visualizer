import React, { useState, useRef } from "react";
import _ from "lodash";

import { generateData } from "./utils";
import { bubbleSort } from "./sorting-algos";
import Board from "./Board";
import Player from "./Player";
import { DataSet } from "./interfaces";

const App: React.FC = () => {
  const displayIntervalId = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<"PLAYING" | "PAUSED" | "FINISHED">("PAUSED");
  const [dataSet, setDataSet] = useState(generateData(20, 30));
  const [sortingMovements, setSortingMovements] = useState<
    { movements: DataSet[]; displayedIndex: number } | undefined
  >(undefined);

  const handleGenerateData = () => {
    const amount = _.random(10, 30);
    const maxValue = _.random(20, 30);

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

    switch (status) {
      case "PLAYING":
        setStatus("PAUSED");
        clearInterval(displayIntervalId.current);
        displayIntervalId.current = undefined;
        break;
      case "PAUSED":
        setStatus("PLAYING");
        displayIntervalId.current = setInterval(() => {
          setSortingMovements(prevState => {
            if (prevState === undefined) {
              return prevState;
            }

            if (prevState.displayedIndex < prevState.movements.length - 1) {
              return { ...prevState, displayedIndex: prevState.displayedIndex + 1 };
            } else {
              setStatus("FINISHED");
              clearInterval(displayIntervalId.current);
              displayIntervalId.current = undefined;
              return prevState;
            }
          });
        }, 300);
        break;
      case "FINISHED":
        setStatus("PAUSED");
        setSortingMovements(undefined);
        break;
    }
  };

  const progress = sortingMovements
    ? ((sortingMovements.displayedIndex + 1) / sortingMovements.movements.length) * 100
    : 0;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handleGenerateData}>GENERATE</button>
      </div>
      <div style={{ flex: 5, padding: "20px 40px" }}>
        <Board dataSet={sortingMovements ? sortingMovements.movements[sortingMovements.displayedIndex] : dataSet} />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Player status={status} progress={progress} onClickPlay={handlePlayClicked} />
      </div>
    </div>
  );
};

export default App;
