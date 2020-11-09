import { DISPLAY_LOADER, HIDE_LOADER } from "../actions/action";

const loaderInitialState = {
  isFullPageLoaderVisible: false,
  loaderText: "",
  isBottomLoaderVisible: false,
  blockBackGround: false,
  centerText: "",
};

export const loaderDataReducer = (state = loaderInitialState, action) => {
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
        loaderText: "Loading...",
      };
      break;
    }
    // case LOG_OUT: {
    //   storage.removeItem("persist:root");
    //   state = undefined;
    //   break;
    // }
    default: {
    }
  }
  return newState;
};
