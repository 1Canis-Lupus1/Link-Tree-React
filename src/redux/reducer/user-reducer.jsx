import { ADD_DATA, DEL_DATA } from "../action";
import {getToken} from '../../http/authToken';

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
      // console.log("User-Reducer:",newState.token);
      getToken(newState.token);
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
