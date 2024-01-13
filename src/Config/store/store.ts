import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slice/StudentSlice";

import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import classReducer from "./../store/slice/ClassSlice";
import storage from "redux-persist/lib/storage";
import authReducer, { AuthState } from "./slice/AuthSlice";
import studentReducer, {
  currentStudentState,
} from "./slice/CurrentStudentSlice";

const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage: storage,
  whitelist: ["users"],
};

const studentsPersistConfig = {
  key: "students",
  storage: storage,
  whitelist: ["enrolledStudents"],
};

const classPersistConfig = {
  key: "class",
  storage: storage,
  whitelist: ["classes"],
};

const studentPersistConfig = {
  key: "student",
  storage: storage,
  whitelist: ["student"],
};

const rootReducer = {
  students: persistReducer(studentsPersistConfig, studentsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  class: persistReducer(classPersistConfig, classReducer),
  student: persistReducer(studentPersistConfig, studentReducer),
};
const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
