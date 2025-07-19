import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { pokemonApi } from '@/services/pokemon';
import { greetingSlice } from '@/features/Greeting';
import { commandBarSlice } from '@/features/CommandBar';
import { aboutMeSlice } from '@/features/AboutMe';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [greetingSlice.reducerPath]: greetingSlice.reducer,
    [commandBarSlice.reducerPath]: commandBarSlice.reducer,
    [aboutMeSlice.reducerPath]: aboutMeSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      pokemonApi.middleware,
    ]),
})

setupListeners(store.dispatch);
