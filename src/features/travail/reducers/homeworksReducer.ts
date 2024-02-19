import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOneClasse } from "./homeworksThunk";

export interface Children {
  id: number;
  child_id: number;
  name: string;
  email: string;
}

const initialState: Children[] = [];

const ClasseSlice = createSlice({
  name: "classe",
  initialState,
  reducers: {
    addClasse: (state, action: PayloadAction<Children>) => {
      state.push(action.payload);
    },
    removeClasse: (state, action: PayloadAction<number>) => {
      return state.filter((child) => child.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneClasse.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const { addClasse, removeClasse } = ClasseSlice.actions;

export default ClasseSlice.reducer;
