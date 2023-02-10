import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  backgroundColor: boolean;
}

const name = "background";

const initalState: StateType = {
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
  },
  extraReducers: {},
});

export const { setBackgroundColor } = ChangedBackgroundSlice.actions;

export default ChangedBackgroundSlice.reducer;
