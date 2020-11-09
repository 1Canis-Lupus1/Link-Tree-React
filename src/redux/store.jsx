import { createStore, combineReducers, applyMiddleware } from "redux";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  userDataReducer,
  contentDataReducer,
  loaderDataReducer,
} from "./reducers";
import logger from "redux-logger";
import { LOG_OUT } from "../redux/actions/action";

const rootReducer = combineReducers({
  userData: userDataReducer,
  loaderData: loaderDataReducer,
  contentData: contentDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  keyPrefix: "",
  stateReconciler: hardSet,
};

//Clearing Out Redux store on Logout
// const rootReducer = (state, action) => {
//   if (action.type === "LOG_OUT") {
//     storage.removeItem("persist:root");
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, undefined, applyMiddleware(logger));

export const persistor = persistStore(store);
