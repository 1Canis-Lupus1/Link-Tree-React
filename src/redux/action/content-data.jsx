import { ADD_ENTRY, EDIT_ENTRY, DELETE_ENTRY, ADD_ID } from "./actions";

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

export const deleteEntry = () => {
  return {
    type: DELETE_ENTRY,
  };
};

export const addId = (_id) => {
  return {
    type: ADD_ID,
    payload: {
      _id,
    },
  };
};