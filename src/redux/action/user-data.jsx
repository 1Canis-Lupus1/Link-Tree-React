import { ADD_DATA, DEL_DATA } from "./actions";

export const logUser = (user) => {
  return {
    type: ADD_DATA,
    payload: user,
  };
};

export const unlogUser = () => {
  return {
    type: DEL_DATA,
  };
};
