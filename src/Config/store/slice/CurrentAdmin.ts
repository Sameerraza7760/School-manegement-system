import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminCredentials } from "../../../types/types.auth";

export interface currentStudentState {
  admin: AdminCredentials | null;
  isAuthenticated: boolean;
}

const initialState: currentStudentState = {
  admin: null,
  isAuthenticated: false,
};

const currentAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminCredentials | null>) => {
      state.admin = action.payload;
    },
    removeAdmin: (state, action: PayloadAction) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, removeAdmin } = currentAdminSlice.actions;
export default currentAdminSlice.reducer;
