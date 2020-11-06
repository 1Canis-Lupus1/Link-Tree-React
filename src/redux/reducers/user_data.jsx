import { ADD_DATA, DEL_DATA, ADD_PIC, ADD_THEME } from "../actions/action";

const userData = {
  userName: "",
  token: "",
  isActive: false,
  avatarLink: "",
};

export const userDataReducer = (state = userData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_DATA: {
      newState = {
        userName: action.payload.userLoginData.userName,
        token: action.payload.userLoginData.token,
        isActive: true,
        avatarLink: "",
      };
      break;
    }
    case DEL_DATA: {
      newState = {
        userName: "",
        token: "",
        isActive: false,
        _id: "",
        avatarLink: "",
      };
      break;
    }
    case ADD_PIC: {
      console.log(action.payload);
      newState.avatarLink = action.payload.avatarLink;
      break;
    }
    case ADD_THEME: {
      newState.template = action.payload.myClassName;
    }
    default: {
    }
  }
  return newState;
};
