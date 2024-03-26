import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClassRoom } from "../../../types/types.class";

export interface currentClassState {
  currentClass: ClassRoom | null;
}

const initialState: currentClassState = {
  currentClass: null,
};

const currentClassSlice = createSlice({
  name: "currentClass",
  initialState,
  reducers: {
    setClass: (state, action: PayloadAction<ClassRoom | null>) => {
      state.currentClass = action.payload;
    },
    removeClass: (state) => {
      state.currentClass = null;
    },
  },
});

export const { setClass, removeClass } = currentClassSlice.actions;
export default currentClassSlice.reducer;
