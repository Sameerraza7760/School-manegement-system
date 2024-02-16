import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentDetail } from "../../../types/types.student";

export interface currentStudentState {
  student: StudentDetail | null;
}

const initialState: currentStudentState = {
  student: null,
};

const currentStudentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<StudentDetail | null>) => {
      state.student = action.payload;
    },
    removeStudent: (state, action: PayloadAction) => {
      state.student = null;
    },
  },
});

export const { setStudent,removeStudent } = currentStudentSlice.actions;
export default currentStudentSlice.reducer;
