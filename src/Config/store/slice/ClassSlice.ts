import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClassRoom } from "../../../types/types.class";

export interface ClassState {
  classes: ClassRoom[] | null;
}

const initialState: ClassState = {
  classes: null,
};

const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
      setClass: (state, action: PayloadAction<ClassRoom[] | null>) => {
        state.classes = action.payload;
      },
    },
  });

export const { setClass } = classSlice.actions;
export default classSlice.reducer;