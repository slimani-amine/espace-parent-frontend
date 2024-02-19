import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOneChildren } from "./oneChildThunk";

export interface Children {
  id: number;
  child_id: number;
  name: string;
  email: string;
}

const initialState: Children[] = [];

const ChildrenSlice = createSlice({
  name: "oneChildren",
  initialState,
  reducers: {
    addChildren: (state, action: PayloadAction<Children>) => {
      state.push(action.payload);
    },
    removeChildren: (state, action: PayloadAction<number>) => {
      return state.filter((child) => child.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneChildren.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addChildren, removeChildren } = ChildrenSlice.actions;

export default ChildrenSlice.reducer;
