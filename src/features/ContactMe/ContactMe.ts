import { createSlice } from "@reduxjs/toolkit"

export interface UserInfo {
  userEmail: string | null;
  userMsg: string | null;
}

export interface YesEmailPrompts {
  triggerYesEmail: boolean;
  userEmailResponseIsLoading: boolean;
  userMsgResponseIsLoading: boolean;
  showMsgPrompt: boolean;
  showCheckPrompt: boolean;
  triggerCheckAnimation: boolean;
  showConfirmPrompt: boolean;
  emailError: boolean;
  msgError: boolean;
}

interface ContactMeState {
  showContactSection: boolean;
  showContactAscii: boolean;
  showContactInfoSection: boolean;
  showContactInfo: boolean;
  currentContactIndex: number;
  showEmailSection: boolean;
  triggerNoEmail: boolean;
  triggerEmailAnimation: boolean;
  yesEmailPrompts: YesEmailPrompts;
  userInfo: UserInfo;
};

const initialState = {
  showContactSection: false,
  showContactAscii: false,
  showContactInfoSection: false,
  showContactInfo: false,
  currentContactIndex: -1,
  showEmailSection: false,
  triggerNoEmail: false,
  triggerEmailAnimation: false,
  yesEmailPrompts: {
    triggerYesEmail: false,
    userEmailResponseIsLoading: false,
    userMsgResponseIsLoading: false,
    showMsgPrompt: false,
    showCheckPrompt: false,
    triggerCheckAnimation: false,
    showConfirmPrompt: false,
    emailError: false,
    msgError: false,
  } as YesEmailPrompts,
  userInfo: {
    userEmail: null,
    userMsg: null,
  } as UserInfo,
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
    setShowEmailSection: (state, action) => {
      state.showEmailSection = action.payload;
    },
    setTriggerNoEmail: (state, action) => {
      state.triggerNoEmail = action.payload;
    },
    setTriggerEmailAnimation: (state, action) => {
      state.triggerEmailAnimation = action.payload;
    },
    setYesEmailPrompts: (state, action) => {
      state.yesEmailPrompts = {
        ...state.yesEmailPrompts,
        ...action.payload,
      };
    },
    setUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  }
});
