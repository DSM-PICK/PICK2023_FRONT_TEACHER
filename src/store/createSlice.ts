import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  setConfirmState: boolean;
  backgroundColor: boolean;
  setGradetate: number;
  setClassState: number;
}

const name = "app";

const initalState: StateType = {
  setConfirmState: false,
  backgroundColor: false,
  setGradetate: 1,
  setClassState: 1,
};

export const AppSlice = createSlice({
  name,
  initialState: { initalState },
  reducers: {
    setBackgroundColor: (
      state,
      action: PayloadAction<{ backgroundColor: boolean }>
    ) => {
      state.initalState.backgroundColor = action.payload.backgroundColor;
    },
    setConfirmState: (
      state,
      action: PayloadAction<{ setConfirmState: boolean }>
    ) => {
      state.initalState.setConfirmState = action.payload.setConfirmState;
    },
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

export const {
  setBackgroundColor,
  setConfirmState,
  setClassNumber,
  setGradeNumber,
} = AppSlice.actions;

export default AppSlice.reducer;
