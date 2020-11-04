import { SHOW_LOADER, HIDE_LOADER } from "./action";

export const showLoader = (loaderText = "Loading") => {
  return {
    type: SHOW_LOADER,
    payload: {
      loaderText,
    },
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};
