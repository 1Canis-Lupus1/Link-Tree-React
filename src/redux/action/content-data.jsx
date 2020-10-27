import { ADD_ENTRY, EDIT_ENTRY, DELETE_ENTRY, ADD_ID } from "./actions";

export const addEntry = (data) => {
  return {
    type: ADD_ENTRY,
    payload: data,
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

export const addId = (id) => {
  return {
    type: ADD_ID,
    payload: id,
  };
};