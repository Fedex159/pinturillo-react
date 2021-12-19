import { types } from "./types";

export const setName = (name) => {
  return {
    type: types.SET_NAME,
    payload: name,
  };
};

export const setAccess = (value) => {
  return {
    type: types.SET_ACCESS,
    payload: value,
  };
};
