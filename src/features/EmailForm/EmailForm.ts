import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  userName: string | null;
  userEmail: string | null;
  userMsg: string | null;
};

interface EmailFormState {
  isSubmitDisabled: boolean;
  displayForm: boolean;
  userFormInfo: UserInfo;
};

const initialState = {
  isSubmitDisabled: true,
  displayForm: false,
  userFormInfo: {} as UserInfo,
} satisfies EmailFormState as EmailFormState;

export const emailFormSlice = createSlice({
  name: "emailForm",
  reducerPath: "emailFormSlice",
  initialState,
  reducers: {
    setIsSubmitDisabled: (state, action) => {
      state.isSubmitDisabled = action.payload;
    },
    setDisplayForm: (state, action) => {
      state.displayForm = action.payload;
    },
        setUserFormInfo: (state, action) => {
      state.userFormInfo = {
        ...state.userFormInfo,
        ...action.payload,
      };
    },
  },
});
