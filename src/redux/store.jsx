import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import {
  userReducer,
  contentReducer,
  loaderReducer,
} from "./reducer";

const rootReducer = combineReducers({
  userData: userReducer,
  loaderData: loaderReducer,
  contentData: contentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  keyPrefix: "",
  stateReconciler: hardSet,
};

const perReducer = persistReducer(persistConfig, rootReducer);

export const store=createStore(
    perReducer,
    undefined,
    applyMiddleware(logger)
);

export const persist=persistStore(store);
