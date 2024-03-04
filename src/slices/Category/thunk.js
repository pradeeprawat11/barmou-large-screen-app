import { createAsyncThunk } from "@reduxjs/toolkit";

import {getCategories as getCategoriesApi} from '../../api/backend_helper'


export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (event) => {
        try {
        const response = getCategoriesApi(event);
        return response;
        } catch (error) {
        return error;
        }
    }
);

export const resetCategoriesApiResponseFlag = createAsyncThunk(
    "categories/resetCategoriesApiResponseFlag",
    async () => {
      try {
        return true;
      // eslint-disable-next-line no-unreachable
      } catch (error) {
        return error;
      }
  }
);