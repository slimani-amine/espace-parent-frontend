import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMe, User } from "./getMeThunk";

const initialState: User[] = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
      return [action.payload];
    });
  },
});

export default userSlice.reducer;
