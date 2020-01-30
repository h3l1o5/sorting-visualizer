import _ from "lodash";

import { colors } from "../utils";
import { DataSet, SortingResult } from "../interfaces";

export default (dataSet: DataSet): SortingResult => {
  const length = dataSet.length;
  const movements: DataSet[] = [];

  const initialState = _.chain(dataSet)
    .cloneDeep()
    .map(item => {
      item.color = colors.unsorted;
      return item;
    })
    .value();
  movements.push(initialState);

  for (let i = 0; i < length; i++) {
    let swapped = false;
    for (let j = 0; j < length - 1 - i; j++) {
      const nextStatus = _.cloneDeep(_.last(movements))!;
      const elementA = _.find(nextStatus, e => e.position === j)!;
      const elementB = _.find(nextStatus, e => e.position === j + 1)!;

      nextStatus.forEach(e => {
        if (e.color === colors.comparing) {
          e.color = colors.unsorted;
        }
      });
      elementA.color = colors.comparing;
      elementB.color = colors.comparing;

      movements.push(_.cloneDeep(nextStatus));

      if (elementA.value - elementB.value > 0) {
        swapped = true;

        const temp = elementA.position;
        elementA.position = elementB.position;
        elementB.position = temp;
        movements.push(_.cloneDeep(nextStatus));
      }
    }

    const nextStatus = _.cloneDeep(_.last(movements))!;

    if (!swapped) {
      nextStatus.forEach(e => {
        e.color = colors.sorted;
      });
      movements.push(_.cloneDeep(nextStatus));
      break;
    }

    const sortedElement = _.find(nextStatus, e => e.position === length - 1 - i)!;
    nextStatus.forEach(e => {
      if (e.color === colors.comparing) {
        e.color = colors.unsorted;
      }
    });
    sortedElement.color = colors.sorted;
    movements.push(_.cloneDeep(nextStatus));
  }

  return {
    legends: [
      { description: "Unsorted", color: colors.unsorted },
      { description: "Comparing", color: colors.comparing },
      { description: "Sorted", color: colors.sorted },
    ],
    movements,
  };
};
