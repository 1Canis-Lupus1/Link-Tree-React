import {
  ADD_ENTRY,
  EDIT_ENTRY,
  DELETE_ENTRY,
  ADD_ID,
  ADD_THEME,
} from "../actions/action";

const contentData = {
  contents: [],
};

export const contentDataReducer = (state = contentData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_ID: {
      newState.id = action.payload._id;
      break;
    }
    case ADD_ENTRY: {
      console.log("ADD_CONTENT_DATA: ", action.payload);
      newState.contents = action.payload;
      break;
    }
    case EDIT_ENTRY: {
      console.log("EDIT_CONTENT_DATA: ", action.payload);
      break;
    }
    case DELETE_ENTRY: {
      console.log("Remove_CONTENT_DATA: ", action.payload);
      newState.contents = [];
      break;
    }
    // case ADD_THEME: {
    //   newState.template = action.payload.myClassName;
    //   break;
    // }

    default: {
    }
  }
  return newState;
};
