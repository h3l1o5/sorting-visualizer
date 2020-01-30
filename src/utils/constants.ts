import { Speed } from "../interfaces";

const TIMER_DELAY: { [speed in Speed]: number } = {
  SLOW: 300,
  NORMAL: 150,
  FAST: 25,
};

const TRANSITION_DELAY: { [speed in Speed]: string } = {
  SLOW: "300ms",
  NORMAL: "150ms",
  FAST: "25ms",
};

export default {
  TIMER_DELAY,
  TRANSITION_DELAY,
};
