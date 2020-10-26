import { ADD_DATA, DEL_DATA } from "../action";

const userData = {
  userName: "",
  token: "",
  isActive: false,
};

export const userReducer = (state = userData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_DATA: {
      newState = {
        userName: action.payload.user.userName,
        token: action.payload.user.token,
        isActive: true,
      };
      break;
    }
    case DEL_DATA: {
      newState = {
        userName: "",
        token: "",
        isActive: false,
      };
      break;
    }
    default: {
    }
  }
  return newState;
};
