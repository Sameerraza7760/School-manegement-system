import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slice/StudentSlice";

import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import classReducer from "./../store/slice/ClassSlice";
import authReducer, { AuthState } from "./slice/AuthSlice";
import studentReducer from "./slice/CurrentStudentSlice";
import teachersReducer from "./slice/TeachersSlice";
import teacherReducer from "./slice/CurrentTeacherSlice";

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

const teachersPersistConfig = {
  key: "teachers",
  storage: storage,
  whitelist: ["enrolledTeachers"],
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

const teacherPersistConfig = {
  key: "teacher",
  storage: storage,
  whitelist: ["teacher"],
};

const rootReducer = {
  students: persistReducer(studentsPersistConfig, studentsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  class: persistReducer(classPersistConfig, classReducer),
  student: persistReducer(studentPersistConfig, studentReducer),
  teachers: persistReducer(teachersPersistConfig, teachersReducer),
  teacher: persistReducer(teacherPersistConfig, teacherReducer),
};
const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
