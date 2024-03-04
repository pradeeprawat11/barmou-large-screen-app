import { createAsyncThunk } from "@reduxjs/toolkit";

import {addOrder as addOrderApi} from '../../api/backend_helper'

export const addOrder = createAsyncThunk(
    "orders/addOrder",
    async (event) => {
        try {
        const response = addOrderApi(event);
        return response;
        } catch (error) {
        return error;
        }
    }
);

export const resetOrderApiResponseFlag = createAsyncThunk(
    "orders/resetOrderApiResponseFlag",
    async () => {
      try {
        return true;
      // eslint-disable-next-line no-unreachable
      } catch (error) {
        return error;
      }
    }
);