import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slice/StudentSlice";

import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import classReducer from "./../store/slice/ClassSlice";
import storage from "redux-persist/lib/storage";
import authReducer, { AuthState } from "./slice/AuthSlice";

const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage: storage,
  whitelist: ["users"],
};
const studentPersistConfig = {
  key: "student",
  storage: storage,
  whitelist: ["somePropertyToPersist"],
};

const classPersistConfig = {
  key: "class",
  storage: storage,
  whitelist: ["classes"],
};

const rootReducer = {
  students: persistReducer(studentPersistConfig, studentReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  class: persistReducer(classPersistConfig, classReducer),
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
