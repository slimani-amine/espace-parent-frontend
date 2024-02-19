// reducers/childIdReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

interface ChildIdState {
  childId: number | null;
}

const initialState: ChildIdState = {
  childId: null,
};

const childIdSlice = createSlice({
  name: "childId",
  initialState,
  reducers: {
    setChildIdToRedux: (state, action: PayloadAction<number | null>) => {
      state.childId = action.payload;
    },
  },
});

export const { setChildIdToRedux } = childIdSlice.actions;
export const selectChildId = (state: RootState) => state.childId.childId;
export default childIdSlice.reducer;
