import React, { useState, useRef } from "react";
import _ from "lodash";
import { generateData } from "./utils";
import { bubbleSort } from "./sorting-algos";

const App: React.FC = () => {
  const sortingIntervalId = useRef<any>(null);
  const [data, setData] = useState(generateData(20, 50));

  const handleGenerateData = () => {
    clearInterval(sortingIntervalId.current);

    const amount = _.random(10, 30);
    const maxValue = _.random(30, 50);

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

  const maxValue = _.maxBy(data, e => e.value)!.value;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handleGenerateData}>GENERATE</button>
        <button onClick={handleSort}>SORT</button>
      </div>
      <div
        style={{
          flex: 5,
          padding: "20px 40px",
        }}
      >
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          {data.map(e => (
            <div
              key={e.id}
              style={{
                transition: "all 300ms",
                position: "absolute",
                bottom: 0,
                left: `calc((100% / ${data.length}) * ${e.position})`,
                height: `calc(100% * ${e.value / maxValue})`,
                width: `calc(100% / ${data.length})`,
                padding: "5px",
                boxSizing: "border-box",
              }}
            >
              <p style={{ transition: "all 300ms", color: e.color || "#fff", margin: 0, textAlign: "center" }}>
                {e.value}
              </p>
              <div
                style={{
                  transition: "all 300ms",
                  height: "100%",
                  width: "100%",
                  backgroundColor: e.color || "#fff",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: "papayawhip" }}>BOTTOM</div>
    </div>
  );
};

export default App;
