import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOneSubject } from "./oneSubjectThunk";

export interface Children {
  id: number;
  child_id: number;
  name: string;
  email: string;
}

const initialState: Children[] = [];

const oneSubjectSlice = createSlice({
  name: "oneSubject",
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<Children>) => {
      state.push(action.payload);
    },
    removeSubject: (state, action: PayloadAction<number>) => {
      return state.filter((child) => child.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneSubject.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const { addSubject, removeSubject } = oneSubjectSlice.actions;

export default oneSubjectSlice.reducer;
