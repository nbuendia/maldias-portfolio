import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from '@/services/pokemon';
import { greetingSlice } from '@/features/Greeting';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [greetingSlice.reducerPath]: greetingSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      pokemonApi.middleware,
    ]),
})

setupListeners(store.dispatch)