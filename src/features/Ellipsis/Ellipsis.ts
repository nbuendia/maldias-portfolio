import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showEllipsis: false,
};

export const ellipsisSlice = createSlice({
  name: "ellipsis",
  reducerPath: "ellipsisSlice",
  initialState,
  reducers: {
    setShowEllipsis: (state, action) => {
      state.showEllipsis = action.payload;
    },
  }
});
