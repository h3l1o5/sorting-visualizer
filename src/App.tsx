import React, { useState, useRef } from "react";
import _ from "lodash";
import { generateData } from "./utils";
import { bubbleSort } from "./sorting-algos";
import Board from "./Board";
import Player from "./Player";

const App: React.FC = () => {
  const sortingIntervalId = useRef<any>(null);
  const [data, setData] = useState(generateData(20, 30));

  const handleGenerateData = () => {
    clearInterval(sortingIntervalId.current);

    const amount = _.random(10, 30);
    const maxValue = _.random(20, 30);

    setData(generateData(amount, maxValue));
  };

  const handleSort = () => {
    clearInterval(sortingIntervalId.current);

    const steps = bubbleSort(data);
    let i = 0;
    sortingIntervalId.current = setInterval(() => {
      if (i < steps.length) {
        setData(steps[i]);
        i++;
      } else {
        clearInterval(sortingIntervalId.current);
      }
    }, 300);
  };

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
        <button onClick={handleSort}>SORT</button>
      </div>
      <div style={{ flex: 5, padding: "20px 40px" }}>
        <Board data={data} />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Player />
      </div>
    </div>
  );
};

export default App;
