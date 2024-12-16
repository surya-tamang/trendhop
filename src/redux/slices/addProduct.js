import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToApi = createAsyncThunk(
  "addproduct",
  async (product, thunkAPi) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPi.rejectWithValue(error.message);
    }
  }
);
const addProduct = createSlice({
  name: "add_product",
  initialState: {
    isLoading: false,
    items: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addToApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addToApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default addProduct.reducer;
