import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice";
import { persistReducer, persistStore } from "redux-persist";
import { version } from "mongoose";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  //name of the localStorage
  key: "root",
  version: 1,
  //we can use session storage also
  storage,
};

const persisterReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisterReducer,
});

export const persistor = persistStore(store);
