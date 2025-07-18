import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Lang = "arm" | "eng";

interface Languages {
    lang: Lang;
}
let lang: Languages = {
    lang: "arm",
};

export const translationSlice = createSlice({
    name: "translation",
    initialState: lang,
    reducers: {
        setTranslation: (state, action: PayloadAction<Lang>) => {
            state.lang = action.payload;
        },
    },
});

export const { setTranslation } = translationSlice.actions;

export default translationSlice.reducer;
