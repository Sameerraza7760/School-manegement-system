import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherInfo } from "../../../types/types.teacher";

export interface TeacherState {
  enrolledTeachers: TeacherInfo[] | null;
}

const initialState: TeacherState = {
  enrolledTeachers: null,
};

const TeacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    enrolledTeachers: (state, action: PayloadAction<TeacherInfo[]>) => {
      state.enrolledTeachers = action.payload;
    },
  },
});

export const { enrolledTeachers } = TeacherSlice.actions;
export default TeacherSlice.reducer;
