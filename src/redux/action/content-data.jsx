import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from "./actions";

export const addEntry = (content) => {
  return {
    type: ADD_ENTRY,
    payload: content,
  };
};

export const editEntry = (content) => {
  return {
    type: EDIT_ENTRY,
    payload: content,
  };
};

export const removeEntry = (content) => {
  return {
    type: REMOVE_ENTRY,
    payload: content,
  };
};
