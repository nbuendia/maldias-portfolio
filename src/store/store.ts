import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { pokemonApi } from '@/services/pokemon';
import { greetingSlice } from '@/features/Greeting';
import { commandBarSlice } from '@/features/CommandBar';
import { aboutMeSlice } from '@/features/AboutMe';
import { contactMeSlice } from '@/features/ContactMe';
import { welcomeBackSlice } from '@/features/WelcomeBack';
import { mainSlice } from '@/features/Main';
import { toastSlice } from '@/features/Toast';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [greetingSlice.reducerPath]: greetingSlice.reducer,
    [commandBarSlice.reducerPath]: commandBarSlice.reducer,
    [aboutMeSlice.reducerPath]: aboutMeSlice.reducer,
    [contactMeSlice.reducerPath]: contactMeSlice.reducer,
    [welcomeBackSlice.reducerPath]: welcomeBackSlice.reducer,
    [mainSlice.reducerPath]: mainSlice.reducer,
    [toastSlice.reducerPath]: toastSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      pokemonApi.middleware,
    ]),
})

setupListeners(store.dispatch);
