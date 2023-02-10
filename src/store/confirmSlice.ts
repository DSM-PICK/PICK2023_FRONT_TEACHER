import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  setConfirmState: boolean;
  backgroundColor: boolean;
}

const name = "background";

const initalState: StateType = {
  setConfirmState: false,
  backgroundColor: false,
};

export const ChangedBackgroundSlice = createSlice({
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
  },
  extraReducers: {},
});

export const { setBackgroundColor, setConfirmState } =
  ChangedBackgroundSlice.actions;

export default ChangedBackgroundSlice.reducer;
