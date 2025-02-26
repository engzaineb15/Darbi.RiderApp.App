import { SET_START_POINT, SET_DROP_OFF_POINT } from "./actionTypes";

export const setStartPoint = (startPoint: any) => ({
  type: SET_START_POINT,
  payload: startPoint,
});

export const setDropOffPoint = (dropOffPoint: any) => ({
  type: SET_DROP_OFF_POINT,
  payload: dropOffPoint,
});
