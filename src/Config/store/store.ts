import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slice/StudentSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import classReducer from "./../store/slice/ClassSlice";
import studentReducer from "./slice/CurrentStudentSlice";
import teacherReducer from "./slice/CurrentTeacherSlice";
import teachersReducer from "./slice/TeachersSlice";
import adminReducer from "./slice/CurrentAdmin";
import currentClassReducer from "./slice/CurrentClassSlice";

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

const ActiveClassConfig = {
  key: "currentClass",
  storage: storage,
  whitelist: ["currentClass"],
};
const rootReducer = {
  students: persistReducer(studentsPersistConfig, studentsReducer),
  class: persistReducer(classPersistConfig, classReducer),
  student: persistReducer(studentPersistConfig, studentReducer),
  teachers: persistReducer(teachersPersistConfig, teachersReducer),
  teacher: persistReducer(teacherPersistConfig, teacherReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
  currentClass: persistReducer(ActiveClassConfig, currentClassReducer),
};
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
