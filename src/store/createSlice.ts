import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  setGradetate: number;
  setClassState: number;
}

const name = "app";

const initalState: StateType = {
  setGradetate: 1,
  setClassState: 1,
};

export const AppSlice = createSlice({
  name,
  initialState: { initalState },
  reducers: {
    setGradeNumber: (
      state,
      action: PayloadAction<{ setGradeState: number }>
    ) => {
      state.initalState.setGradetate = action.payload.setGradeState;
    },
    setClassNumber: (
      state,
      action: PayloadAction<{ setClassState: number }>
    ) => {
      state.initalState.setClassState = action.payload.setClassState;
    },
  },
  extraReducers: {},
});

export const { setClassNumber, setGradeNumber } = AppSlice.actions;

export default AppSlice.reducer;
