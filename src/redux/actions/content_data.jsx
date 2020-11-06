import {
  ADD_ENTRY,
  EDIT_ENTRY,
  DELETE_ENTRY,
  ADD_ID,
  ADD_AVATAR,
} from "./action";

export const addContent = (pageContents) => {
  console.log("My Links:", pageContents);
  return {
    type: ADD_ENTRY,
    payload: pageContents,
  };
};

export const editContent = (content) => {
  return {
    type: EDIT_ENTRY,
    payload: content,
  };
};

export const removeContent = (content) => {
  return {
    type: DELETE_ENTRY,
    payload: content,
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
export const addUserAvatar = (avatarLink) => {
  return {
    type: ADD_AVATAR,
    payload: {
      avatarLink,
    },
  };
};
