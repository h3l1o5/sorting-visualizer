import { DataSet } from "../interfaces";
import _ from "lodash";

export default (dataSet: DataSet) => {
  const length = dataSet.length;
  const movements: DataSet[] = [];
  movements.push(_.cloneDeep(dataSet));

  for (let i = 0; i < length; i++) {
    let swapped = false;
    for (let j = 0; j < length - 1 - i; j++) {
      const nextStatus = _.cloneDeep(_.last(movements))!;
      const elementA = _.find(nextStatus, e => e.position === j)!;
      const elementB = _.find(nextStatus, e => e.position === j + 1)!;

      nextStatus.forEach(e => {
        if (e.color === "green") {
          e.color = "#fff";
        }
      });
      elementA.color = "green";
      elementB.color = "green";

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
        e.color = "#DB7093";
      });
      movements.push(_.cloneDeep(nextStatus));
      break;
    }

    const sortedElement = _.find(nextStatus, e => e.position === length - 1 - i)!;
    nextStatus.forEach(e => {
      if (e.color === "green") {
        e.color = "#fff";
      }
    });
    sortedElement.color = "#DB7093";
    movements.push(_.cloneDeep(nextStatus));
  }

  return movements;
};
