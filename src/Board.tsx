import React from "react";
import _ from "lodash";
import { DataSet } from "./interfaces";

interface Props {
  dataSet: DataSet;
}
const Board: React.FC<Props> = props => {
  const maxValue = _.maxBy(props.dataSet, e => e.value)!.value;

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {props.dataSet.map(e => (
        <div
          key={e.id}
          style={{
            transition: "all 150ms",
            position: "absolute",
            bottom: 0,
            left: `calc((100% / ${props.dataSet.length}) * ${e.position})`,
            height: "100%",
            width: `calc(100% / ${props.dataSet.length})`,
            padding: "5px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              transition: "all 150ms",
              color: e.color || "#fff",
              margin: 0,
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            {e.value}
          </p>
          <div
            style={{
              transition: "all 300ms",
              height: `calc((100% - 1.2rem) * ${e.value / maxValue})`,
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
  );
};

export default Board;
