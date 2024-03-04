import { createSlice } from "@reduxjs/toolkit";

import {
    addOrder,
    resetOrderApiResponseFlag
} from "./thunk"

export const initialState = {
    orderStatusCode: null,
    error: {},
    orderMsgResponse: {},
    orderAddUpdate: {},
}; 

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    
    // Get Menu
    builder.addCase(addOrder.fulfilled, (state, action) => {
    state.orderStatusCode = action.payload.statusCode;
    state.orderMsgResponse = action.payload.message;
    })
    builder.addCase(addOrder.rejected, (state, action) => {
    state.error = action.payload || null;
    state.orderStatusCode = 400;
    })

    // Menu Msg Res
    builder.addCase(resetOrderApiResponseFlag.fulfilled, (state, action) => {
    state.orderMsgResponse = { message: "" };
    state.orderStatusCode = null;
    })
    },
})

export default orderSlice.reducer;