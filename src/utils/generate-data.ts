import { Data } from "../interfaces";
import _ from "lodash";

export default (amount: number, maxValue: number): Data => {
  const elements = _.chain(amount)
    .range()
    .map(i => ({ id: _.random(1, true), value: _.random(1, maxValue), position: i }))
    .value();

  return elements;
};
