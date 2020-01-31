import _ from "lodash";

import { colors } from "../utils";
import { DataSet, SortingResult } from "../interfaces";

export default (dataSet: DataSet): SortingResult => {
  const length = dataSet.length;
  const movements: DataSet[] = [];

  const state = _.chain(dataSet)
    .cloneDeep()
    .map(item => {
      item.color = colors.unsorted;
      return item;
    })
    .value();
  movements.push(_.cloneDeep(state));

  for (let i = 0; i < length; i++) {
    let minIndex = i;

    const initialMinItem = _.find(state, e => e.position === minIndex)!;

    initialMinItem.color = colors.unsortedSmallest;
    movements.push(_.cloneDeep(state));

    for (let j = i + 1; j < length; j++) {
      const currentItem = _.find(state, e => e.position === j)!;
      const lastItem = _.find(state, e => e.position === j - 1)!;
      const currentMinItem = _.find(state, e => e.position === minIndex)!;

      if (lastItem.color === colors.comparing) {
        lastItem.color = colors.unsorted;
      }
      currentItem.color = colors.comparing;
      movements.push(_.cloneDeep(state));

      if (currentItem.value < currentMinItem.value) {
        minIndex = j;
        currentItem.color = colors.unsortedSmallest;
        currentMinItem.color = colors.unsorted;

        movements.push(_.cloneDeep(state));
      } else {
        currentItem.color = colors.unsorted;
      }
    }

    const minItem = _.find(state, e => e.position === minIndex)!;
    const itemInPositionI = _.find(state, e => e.position === i)!;

    const temp = itemInPositionI.position;
    itemInPositionI.position = minItem.position;
    minItem.position = temp;
    minItem.color = colors.sorted;

    movements.push(_.cloneDeep(state));
  }

  return {
    movements,
    legends: [
      { description: "Unsorted", color: colors.unsorted },
      { description: "Unsorted Smallest", color: colors.unsortedSmallest },
      { description: "Comparing", color: colors.comparing },
      { description: "Sorted", color: colors.sorted },
    ],
  };
};
