import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentDetail } from "../../../types/types.student";

export interface StudentState {
  enrolledStudents: StudentDetail[] | null;
}

const initialState: StudentState = {
  enrolledStudents: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    enrollStudent: (state, action: PayloadAction<StudentDetail[] | null>) => {
      state.enrolledStudents = action.payload;
    },
  },
});

export const { enrollStudent } = studentSlice.actions;
export default studentSlice.reducer;
