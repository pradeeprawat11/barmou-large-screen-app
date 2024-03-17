import { createSlice } from "@reduxjs/toolkit";

import {
    getMenu,
    resetMenuApiResponseFlag
} from "./thunk";

export const initialState = {
    menu: [],
    error: {},
    menuMsgResponse: {},
    menuAddUpdate: {},
    menuStatusCode: null,
}; 

const menuSlice = createSlice({
    name: "menus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    
    // Get Menu
    builder.addCase(getMenu.fulfilled, (state, action) => {
    state.menuStatusCode = action.payload.statusCode;
    state.menu = action.payload.data;
    })
    builder.addCase(getMenu.rejected, (state, action) => {
    state.error = action.payload || null;
    state.menuStatusCode = 400;
    })

    // Menu Msg Res
    builder.addCase(resetMenuApiResponseFlag.fulfilled, (state, action) => {
    state.menuMsgResponse = { message: "" };
    state.menuStatusCode = null;
    })
    },
});

export default menuSlice.reducer;