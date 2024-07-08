import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "redux/useSlice",
  async (formData,{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth",
        formData
      );
        return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    loading: false,
    success: false,
    user: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        (state.loading = true), (state.user = null);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      })
      .addCase(registerUser.fulfilled, (state) => {
        (state.loading = false),
          (state.success = true),
          (state.user = null),
          (state.error = "");
      });
  },
});

export default userSlice.reducer;
