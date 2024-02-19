import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./getMeThunk";
import { addOperation } from "./operationsThunk";

const initialState: User[] = [];

const userOperationsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addingOperation: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    removeOperation: (state, action: PayloadAction<number>) => {
      return state.filter((child) => child.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOperation.fulfilled, (state, action) => {
      state.push(action.payload);
      return action.payload;
    });
  },
});

export const { addingOperation, removeOperation } = userOperationsSlice.actions;

export default userOperationsSlice.reducer;
