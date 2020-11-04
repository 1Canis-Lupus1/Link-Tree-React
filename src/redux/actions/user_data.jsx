import { ADD_DATA, DEL_DATA, ADD_PIC } from "./action";

export const logUser = (user) => {
  return {
    type: ADD_DATA,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: DEL_DATA,
  };
};

export const addUserAvatar = (avatarLink) => {
  return {
    type: ADD_PIC,
    payload: {
      avatarLink,
    },
  };
};
