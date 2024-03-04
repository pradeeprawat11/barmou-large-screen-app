import { createAsyncThunk } from "@reduxjs/toolkit";

import {getAssetInfos as getAssetInfosApi} from '../../api/backend_helper'

export const getAssetInfo = createAsyncThunk(
  "menus/getAssetInfo",
  async (event) => {
      try {
      const response = getAssetInfosApi(event);
      return response;
      } catch (error) {
      return error;
      }
  }
);
