// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { adminDetail } from "../../../types/types.auth";

// export interface authState {
//   currentauth: adminDetail | null;
// }

// const initialState: authState = {
//   currentauth: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth: (state, action: PayloadAction<adminDetail | null>) => {
//       state.currentauth = action.payload;
//     },
//     Logout: (state) => {
//       state.currentauth = null;
//     },
//   },
// });

// export const { setAuth, Logout } = authSlice.actions;
// export default authSlice.reducer;
