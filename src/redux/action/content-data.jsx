import { ADD_CONTENT, EDIT_CONTENT, REMOVE_CONTENT } from "./actions";

export const addContent = (content) => {
  return {
    type: ADD_CONTENT,
    payload: content,
  };
};

export const editContent = (content) => {
  return {
    type: EDIT_CONTENT,
    payload: content,
  };
};

export const removeContent = (content) => {
  return {
    type: REMOVE_CONTENT,
    payload: content,
  };
};
