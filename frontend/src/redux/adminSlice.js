import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk(
  "adminLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );
      console.log(response, "this is the response the the axios");
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(rejectWithValue(error.response.data,"is slice "));
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Internal server error" });
      }
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    user: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        (state.error = ""), (state.loading = true);
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default adminSlice.reducer;
