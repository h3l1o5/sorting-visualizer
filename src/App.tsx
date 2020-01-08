import React, { useState, useRef } from "react";
import "./App.css";
import _ from "lodash";
import bubbleSort from "./sorting-algos/bubble-sort";

const App: React.FC = () => {
  const sortingIntervalId = useRef<any>(null);
  const [state, setState] = useState({
    elements: [
      { id: 0, value: 1, position: 0, color: "#fff" },
      { id: 1, value: 2, position: 1, color: "#fff" },
      { id: 2, value: 3, position: 2, color: "#fff" },
      { id: 3, value: 4, position: 3, color: "#fff" },
      { id: 4, value: 5, position: 4, color: "#fff" },
      { id: 5, value: 6, position: 5, color: "#fff" },
      { id: 6, value: 7, position: 6, color: "#fff" },
      { id: 7, value: 8, position: 7, color: "#fff" },
      { id: 8, value: 9, position: 8, color: "#fff" },
      { id: 9, value: 10, position: 9, color: "#fff" },
    ],
  });

  const handleGenerate = () => {
    clearInterval(sortingIntervalId.current);

    const amount = _.random(10, 30);
    const elements = _.chain(amount)
      .range()
      .map(i => ({ id: _.random(1, true), value: _.random(1, 30), position: i, color: "#fff" }))
      .value();

    setState({ elements });
  };

  const handleSort = () => {
    clearInterval(sortingIntervalId.current);

    const steps = bubbleSort(state.elements);
    let i = 0;
    sortingIntervalId.current = setInterval(() => {
      if (i < steps.length) {
        setState({ elements: steps[i] });
        i++;
      } else {
        clearInterval(sortingIntervalId.current);
      }
    }, 100);
  };

  const maxValue = _.maxBy(state.elements, e => e.value)!.value;

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
        <button onClick={handleGenerate}>GENERATE</button>
        <button onClick={handleSort}>SORT</button>
      </div>
      <div
        style={{
          flex: 5,
          padding: "20px 40px",
        }}
      >
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          {state.elements.map(e => (
            <div
              key={e.id}
              style={{
                transition: "all 100ms",
                position: "absolute",
                bottom: 0,
                left: `calc((100% / ${state.elements.length}) * ${e.position})`,
                height: `calc(100% * ${e.value / maxValue})`,
                width: `calc(100% / ${state.elements.length})`,
                padding: "5px",
                boxSizing: "border-box",
              }}
            >
              <p style={{ color: e.color, margin: 0, textAlign: "center" }}>{e.value}</p>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: e.color,
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
      <div style={{ flex: 2, backgroundColor: "papayawhip" }}>BOTTOM</div>
    </div>
  );
};

export default App;
