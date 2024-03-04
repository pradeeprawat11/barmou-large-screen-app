import { createSlice } from "@reduxjs/toolkit";

import {
    getCategories,
    resetCategoriesApiResponseFlag
} from "./thunk";

export const initialState = {
    categories: [],
    error: {},
    categoriesMsgResponse: {},
    categoriesAddUpdate: {},
}; 

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    
    // Get Categories
    builder.addCase(getCategories.fulfilled, (state, action) => {
    state.categories = action.payload.data;
    })
    builder.addCase(getCategories.rejected, (state, action) => {
    state.error = action.payload || null;
    })

    // Categories Msg Res
    builder.addCase(resetCategoriesApiResponseFlag.fulfilled, (state, action) => {
    state.categoriesMsgResponse = { message: "" };
    })
    },
});

export default categoriesSlice.reducer;