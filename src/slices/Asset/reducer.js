import { createSlice } from "@reduxjs/toolkit";

import {
    getAssetInfo
} from "./thunk";

export const initialState = {
    asset: [],
    error: {}
};

const assetSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get getAssetInfo
        builder.addCase(getAssetInfo.fulfilled, (state, action) => {
            state.asset = action.payload.data;
        })
        builder.addCase(getAssetInfo.rejected, (state, action) => {
            state.error = action.payload || null;
        })
    },
});

export default assetSlice.reducer;