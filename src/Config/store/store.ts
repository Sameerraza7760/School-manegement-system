import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slice/StudentSlice";
// import authReducer, { authState } from "./slice/AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import classReducer from "./../store/slice/ClassSlice";
import storage from "redux-persist/lib/storage";
// const authPersistConfig = {
//   key: "auth",
//   storage,
//   blacklist: ["somePropertyNotToPersist"],
// };

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
  // authData: persistReducer(authPersistConfig, authReducer),
  class: persistReducer(classPersistConfig, classReducer),
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
