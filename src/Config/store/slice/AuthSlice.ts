import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredentials, UserRole } from "./../../../types/types.auth";
import {
  AdminCredentials,
  StudentCredentials,
  TeacherCredentials,
} from "../../../types/types.auth";

export interface AuthState {
  users: Record<string, UserCredentials> | null;
}

const initialState: AuthState = {
  users: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupAdmin: (state, action: PayloadAction<AdminCredentials>) => {
      const { ...user } = action.payload;
      state.users = { ...user, role: UserRole.Admin };
    },
    signupTeacher: (state, action: PayloadAction<TeacherCredentials>) => {
      const { ...user } = action.payload;
      state.users = { ...user, role: UserRole.Teacher };
    },
    signupStudent: (state, action: PayloadAction<StudentCredentials>) => {
      const { ...user } = action.payload;
      state.users = { ...user, role: UserRole.Student };
    },
  },
});

export const { signupAdmin, signupTeacher, signupStudent } = authSlice.actions;
export default authSlice.reducer;
