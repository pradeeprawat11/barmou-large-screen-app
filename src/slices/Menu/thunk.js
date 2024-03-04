import { createAsyncThunk } from "@reduxjs/toolkit";

import {getMenu as getMenuApi} from '../../api/backend_helper'

export const getMenu = createAsyncThunk(
    "menus/getMenu",
    async (event) => {
        try {
        const response = getMenuApi(event);
        return response;
        } catch (error) {
        return error;
        }
    }
);

export const resetMenuApiResponseFlag = createAsyncThunk(
    "menus/resetMenuApiResponseFlag",
    async () => {
      try {
        return true;
      // eslint-disable-next-line no-unreachable
      } catch (error) {
        return error;
      }
    }
);