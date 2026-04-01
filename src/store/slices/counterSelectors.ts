import { ApptState } from "../store";

export const selectCounterValue = (state: ApptState) => state.counter.value;
