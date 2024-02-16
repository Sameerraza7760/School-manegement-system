import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminCredentials } from "../../../types/types.auth";

export interface currentStudentState {
  admin: AdminCredentials | null;
}

const initialState: currentStudentState = {
  admin: null,
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

export const { setAdmin,removeAdmin } = currentAdminSlice.actions;
export default currentAdminSlice.reducer;
