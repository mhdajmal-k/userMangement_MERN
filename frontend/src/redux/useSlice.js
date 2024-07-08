import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
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

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if(error.response){
        return rejectWithValue(error.response.data);
      }else{
        return rejectWithValue({error:"server error"})
      }
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
        (state.loading = false), (state.error = action.payload.error);
      })
      .addCase(registerUser.fulfilled, (state) => {
        (state.loading = false),
          (state.success = true),
          (state.user = null),
          (state.error = "");
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = action.payload.user),
          (state.success = true),
          state.error="";
      })
      .addCase(LoginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.user = ""),
          (state.error = action.payload.error);
      });
  },
});

export default userSlice.reducer;
