import { createSlice } from "@reduxjs/toolkit"

export interface UserInfo {
  userName: string | null;
  userEmail: string | null;
  userMsg: string | null;
}

export interface NoEmailPrompts {
  triggerNoEmail: boolean;
  noEmailResetIsLoading: boolean;
}

export interface YesEmailPrompts {
  triggerYesEmail: boolean;
  triggerEmailBlurAnimation: boolean;
}

interface ContactMeState {
  showContactSection: boolean;
  showContactAscii: boolean;
  showContactInfoSection: boolean;
  showContactInfo: boolean;
  currentContactIndex: number;
  showEmailSection: boolean;
  triggerEmailAnimation: boolean;
  noEmailPrompts: NoEmailPrompts;
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
  triggerEmailAnimation: false,

  noEmailPrompts: {
    triggerNoEmail: false,
    noEmailResetIsLoading: false,
  } as NoEmailPrompts,  

  yesEmailPrompts: {
    triggerYesEmail: false,    
  } as YesEmailPrompts,
  
  userInfo: {
    userName: null,
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
    setTriggerEmailAnimation: (state, action) => {
      state.triggerEmailAnimation = action.payload;
    },
    setNoEmailPrompts: (state, action) => {
      state.noEmailPrompts = {
        ...state.noEmailPrompts,
        ...action.payload,
      };
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
