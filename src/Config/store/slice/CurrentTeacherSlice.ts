import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherInfo } from "../../../types/types.teacher";

export interface currentTeacherState {
  teacher: TeacherInfo | null;
}

const initialState: currentTeacherState = {
  teacher: null,
};

const currentTeacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacher: (state, action: PayloadAction<TeacherInfo | null>) => {
      state.teacher = action.payload;
    },
    removeTeacher: (state, action: PayloadAction) => {
      state.teacher = null;
    },
  },
});

export const { setTeacher, removeTeacher } = currentTeacherSlice.actions;
export default currentTeacherSlice.reducer;
