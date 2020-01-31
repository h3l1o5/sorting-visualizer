import { Speed } from "../interfaces";

const TIMER_DELAY: { [speed in Speed]: number } = {
  SLOW: 500,
  NORMAL: 150,
  FAST: 15,
};

const TRANSITION_DELAY: { [speed in Speed]: string } = {
  SLOW: "500ms",
  NORMAL: "150ms",
  FAST: "0ms",
};

export default {
  TIMER_DELAY,
  TRANSITION_DELAY,
};
