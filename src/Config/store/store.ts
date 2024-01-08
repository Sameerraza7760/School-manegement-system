import { configureStore } from "@reduxjs/toolkit";
import studentReducer, { StudentState } from "./slice/StudentSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
