import { ADD_DATA, DEL_DATA, ADD_PIC } from "../action";
import { getToken } from "../../http/authToken";

const userData = {
  userName: "",
  token: "",
  isActive: false,
  uploadURL: "",
};

export const userReducer = (state = userData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_DATA: {
      newState = {
        userName: action.payload.user.userName,
        token: action.payload.user.token,
        isActive: true,
        uploadURL: "",
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
        uploadURL: "",
      };
      break;
    }
    case ADD_PIC: {
      newState.uploadURL = action.payload.uploadURL;
      break;
    }
    default: {
    }
  }
  return newState;
};
