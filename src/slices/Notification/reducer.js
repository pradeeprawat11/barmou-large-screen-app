import { createSlice } from "@reduxjs/toolkit";

import {
    addNotification,
} from "./thunk";

export const initialState = {
    notification: [],
    error: {},
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Notification
        builder.addCase(addNotification.fulfilled, (state, action) => {
            state.notification = action.payload;
        })
        builder.addCase(addNotification.rejected, (state, action) => {
            state.error = action.payload || null;
        })
    },
});

export default notificationsSlice.reducer;