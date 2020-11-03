import { ADD_DATA, DEL_DATA, ADD_PIC } from "./actions";

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

export const picUpload = (picURL) => {
  return {
    type: ADD_PIC,
    payload: {
      picURL,
    },
  };
};
