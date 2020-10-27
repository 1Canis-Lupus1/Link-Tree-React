import { DISPLAY_LOADER, HIDE_LOADER } from "../action";

const loaderInitialState = {
  isFullPageLoaderVisible: false,
  loaderText: "",
  isBottomLoaderVisible: false,
  blockBackGround: false,
  centerText: "",
};

export const loaderReducer = (state = loaderInitialState, action) => {
  console.log("Loader-Reducer : ", state);
  let newState = { ...state };
  switch (action.type) {
    case DISPLAY_LOADER: {
      newState = {
        isFullPageLoaderVisible: true,
        loaderText: action.payload.loaderText,
      };
      break;
    }
    case HIDE_LOADER: {
      newState = {
        isFullPageLoaderVisible: false,
        // loaderText: "Loading...",
      };
      break;
    }
    default: {
    }
  }
  return newState;
};
