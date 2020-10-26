import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from "../action";

const contentData = {
  page: [],
};

export const contentReducer = (state = contentData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_ENTRY: {
      break;
    }
    case EDIT_ENTRY: {
      break;
    }
    case REMOVE_ENTRY: {
      break;
    }
    default: {
    }
  }
  return newState;
};
