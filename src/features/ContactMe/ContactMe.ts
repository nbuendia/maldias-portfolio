import { createSlice } from "@reduxjs/toolkit"

export interface SendEmailPrompts {
  sendEmailPrompt: boolean;
  triggerEmailAnimation: boolean;
  sentEmailConfrimation: boolean;
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
  showContactInfoSection: boolean;
  showContactInfo: boolean;
  showEmailSection: boolean;
  sendEmailPrompts: SendEmailPrompts;
  noEmailPrompts: NoEmailPrompts;
  yesEmailPrompts: YesEmailPrompts;
};

const initialState = {
  showContactInfoSection: false,
  showContactInfo: false,
  showEmailSection: false,
  
  sendEmailPrompts: {
    sendEmailPrompt: false,
    triggerEmailAnimation: false,
    sentEmailConfrimation: false,
  } as SendEmailPrompts,

  noEmailPrompts: {
    triggerNoEmail: false,
    noEmailResetIsLoading: false,
  } as NoEmailPrompts,  

  yesEmailPrompts: {
    triggerYesEmail: false,
  } as YesEmailPrompts,
} satisfies ContactMeState as ContactMeState;


export const contactMeSlice = createSlice({
  name: "contactMe",
  reducerPath: "contactMeSlice",
  initialState,
  reducers: {
    setShowContactInfoSection: (state, action) => {
      state.showContactInfoSection = action.payload;
    },
    setShowContactInfo: (state, action) => {
      state.showContactInfo = action.payload;
    },
    setShowEmailSection: (state, action) => {
      state.showEmailSection = action.payload;
    },
    setSendEmailPrompts: (state, action) => {
      state.sendEmailPrompts = {
        ...state.sendEmailPrompts,
        ...action.payload,
      };
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
  }
});
