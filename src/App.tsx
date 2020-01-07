import React, { useEffect, useState } from "react";
import "./App.css";
import _ from "lodash";

const App: React.FC = () => {
  const [state, setState] = useState({
    max: 20,
    elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  });

  useEffect(() => {
    setInterval(() => {
      const newElements = _.range(20).map(() => Math.floor(Math.random() * 49) + 1);
      const newMax = _.max(newElements) || 0;

      setState({
        max: newMax,
        elements: newElements,
      });
    }, 2000);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, backgroundColor: "red" }}>TOP</div>
      <div
        style={{
          flex: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "20px 40px",
        }}
      >
        {state.elements.map((e, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              height: `calc(100% * ${e / state.max})`,
              margin: "0px 5px",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            {e}
          </div>
        ))}
      </div>
      <div style={{ flex: 2, backgroundColor: "red" }}>BOTTOM</div>
    </div>
  );
};

export default App;
