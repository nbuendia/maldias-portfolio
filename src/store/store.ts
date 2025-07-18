import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { pokemonApi } from '@/services/pokemon';
import { greetingSlice } from '@/features/Greeting';
import { commandBarSlice } from '@/features/CommandBar';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [greetingSlice.reducerPath]: greetingSlice.reducer,
    [commandBarSlice.reducerPath]: commandBarSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      pokemonApi.middleware,
    ]),
})

setupListeners(store.dispatch);
