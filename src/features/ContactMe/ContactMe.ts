import { createSlice } from "@reduxjs/toolkit"

interface ContactMeState {
  showContactSection: boolean;
  showContactAscii: boolean;
  showContactInfoSection: boolean;
  showContactInfo: boolean;
  currentContactIndex: number;
};

const initialState = {
  showContactSection: false,
  showContactAscii: false,
  showContactInfoSection: false,
  showContactInfo: false,
  currentContactIndex: -1,
} satisfies ContactMeState as ContactMeState;


export const contactMeSlice = createSlice({
  name: "contactMe",
  reducerPath: "contactMeSlice",
  initialState,
  reducers: {
    setShowContactSection: (state, action) => {
      state.showContactSection = action.payload;
    },
    setShowContactAscii: (state, action) => {
      state.showContactAscii = action.payload;
    },
    setShowContactInfoSection: (state, action) => {
      state.showContactInfoSection = action.payload;
    },
    setShowContactInfo: (state, action) => {
      state.showContactInfo = action.payload;
    },
    setCurrentContactIndex: (state, action) => {
        state.currentContactIndex = action.payload;
    },
  }
});
