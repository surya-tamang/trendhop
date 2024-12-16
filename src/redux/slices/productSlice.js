import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on a new request
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        console.log("Error: ", action.error.message);
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on a new request
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        console.log("Error: ", action.error.message);
      });
  },
});

export default productSlice.reducer;
