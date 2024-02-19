import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSubjectsProgresses } from "./subjectsThunk";

export interface Children {
  id: number;
  child_id: number;
  name: string;
  email: string;
}

const initialState: Children[] = [];

const SubjectsSlice = createSlice({
  name: "subjectProgression",
  initialState,
  reducers: {
    addSubjects: (state, action: PayloadAction<Children>) => {
      state.push(action.payload);
    },
    removeSubjects: (state, action: PayloadAction<number>) => {
      return state.filter((child) => child.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSubjectsProgresses.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const { addSubjects, removeSubjects } = SubjectsSlice.actions;

export default SubjectsSlice.reducer;
