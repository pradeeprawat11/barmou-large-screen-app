import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification as addNotificationApi } from '../../api/backend_helper'

export const addNotification = createAsyncThunk(
  "notification/addNotification",
  async (event) => {
    try {
      const response = addNotificationApi(event);
      return response;
    } catch (error) {
      return error;
    }
  }
);
