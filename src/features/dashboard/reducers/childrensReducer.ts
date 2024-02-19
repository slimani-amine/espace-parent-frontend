import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChildren, insertChildren } from "./childrensThunk";

export interface Children {
  id: number;
  child_id: number;
  name: string;
  email: string;
}

const initialState: Children[] = [];

const ChildrensSlice = createSlice({
  name: "childrens",
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
    builder.addCase(getChildren.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(insertChildren.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { addChildren, removeChildren } = ChildrensSlice.actions;

export default ChildrensSlice.reducer;
