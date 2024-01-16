import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slice/StudentSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import classReducer from "./../store/slice/ClassSlice";
import studentReducer from "./slice/CurrentStudentSlice";
import teacherReducer from "./slice/CurrentTeacherSlice";
import teachersReducer from "./slice/TeachersSlice";
import adminReducer from "./slice/CurrentAdmin";

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

const adminPersistConfig = {
  key: "admin",
  storage: storage,
  whitelist: ["admin"],
};
const rootReducer = {
  students: persistReducer(studentsPersistConfig, studentsReducer),
  class: persistReducer(classPersistConfig, classReducer),
  student: persistReducer(studentPersistConfig, studentReducer),
  teachers: persistReducer(teachersPersistConfig, teachersReducer),
  teacher: persistReducer(teacherPersistConfig, teacherReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
};
const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
