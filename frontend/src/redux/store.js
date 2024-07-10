import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from './adminSlice'

const rootReducer = combineReducers({ user: userReducer,admin:adminReducer });

const persistConfig = {
  //name of the localStorage
  key: "root",
  version: 1,
  //we can use session storage also
  storage,
  //excluding admin
  blacklist: ['admin']
};

const persisterReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisterReducer,
});

export const persistor = persistStore(store);
