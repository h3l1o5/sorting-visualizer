import React from "react";

import { DataSet, Legend } from "./interfaces";
import { colors } from "./utils";

interface Props {
  maxValue: number;
  legends: Legend[];
  dataSet: DataSet;
  transitionDelay: string;
}
const Board: React.FC<Props> = props => {
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "5%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {props.legends.map(legend => (
          <div
            key={legend.description}
            style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "20px" }}
          >
            <div
              style={{
                height: "1em",
                width: "3em",
                backgroundColor: legend.color,
                borderRadius: "5px",
                marginRight: "5px",
              }}
            ></div>
            <p style={{ margin: 0, padding: 0, fontSize: "1em", color: colors.white }}>{legend.description}</p>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, width: "100%", position: "relative" }}>
        {props.dataSet.map(e => (
          <div
            key={e.id}
            style={{
              transition: `all ${props.transitionDelay}`,
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
                transition: `all ${props.transitionDelay}`,
                color: e.color || colors.white,
                margin: 0,
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              {e.value}
            </p>
            <div
              style={{
                transition: `all ${props.transitionDelay}`,
                height: `calc((100% - 1.2rem) * ${e.value / props.maxValue})`,
                width: "100%",
                backgroundColor: e.color || colors.white,
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
  );
};

export default Board;
