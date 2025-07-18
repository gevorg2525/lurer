"use client";

import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./features/translations/translationsSlice";
import { norKhosqApi } from "./features/api/norKhosqkApi";
import searchReducer from "./features/search/searchSlice";

export const store = configureStore({
    reducer: {
        translation: translationReducer,
        search: searchReducer,
        [norKhosqApi.reducerPath]: norKhosqApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({}).concat([norKhosqApi.middleware]);
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
