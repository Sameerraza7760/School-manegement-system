import { configureStore } from "@reduxjs/toolkit";
import studentReducer, { StudentState } from "./slice/StudentSlice";
// import authReducer, { authState } from "./slice/AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
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

const rootReducer = {
  students: persistReducer(studentPersistConfig, studentReducer),
  // authData: persistReducer(authPersistConfig, authReducer),
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
