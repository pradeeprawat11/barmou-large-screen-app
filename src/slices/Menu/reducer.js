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
}; 

const menuSlice = createSlice({
    name: "menus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    
    // Get Menu
    builder.addCase(getMenu.fulfilled, (state, action) => {
    state.menu = action.payload.data;
    })
    builder.addCase(getMenu.rejected, (state, action) => {
    state.error = action.payload || null;
    })

    // Menu Msg Res
    builder.addCase(resetMenuApiResponseFlag.fulfilled, (state, action) => {
    state.menuMsgResponse = { message: "" };
    })
    },
});

export default menuSlice.reducer;