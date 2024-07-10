import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk(
  "adminLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData,{withCredentials:true}
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

export const fetchUser=createAsyncThunk("fetchUser",async(_,{rejectWithValue})=>{
  try {
    const response=await axios("http://localhost:5000/api/admin/getUsers",{withCredentials:true})
    console.log(response.data,"form fetchUsers")
    return response.data
  } catch (error) {
    if(error.response){
      return rejectWithValue(error.response.data)
    }else{
      console.log(error,"is form the error ");
      return rejectWithValue({error:"internal Server error"})
    }
  }
})

export const updateUser=createAsyncThunk("updateUser",async(formData,{rejectWithValue})=>{
  try {
    const {id,...restData}=formData
    console.log(id,":is the id from from data")
    const response=await axios.put(`http://localhost:5000/api/admin/updateUser/${id}`,restData,{withCredentials:true})
    console.log(response);
    if(response.data){

      return response.data
    }
  } catch (error) {
    console.log(error)
    if(error.response){
      return rejectWithValue(error.response.data)
    }else{
      return rejectWithValue({error:'internal server error'})
    }
  }
})

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    users: [],
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
      })
      .addCase(fetchUser.pending,(state)=>{
        state.loading=true
      })
      .addCase(fetchUser.rejected,(state,action)=>{
        console.log(action,"is from acion");
        state.loading=false,
        state.error=action.payload.error
      })
      .addCase(fetchUser.fulfilled,(state,action)=>{
        console.log(action.payload,"from action")
        state.loading=false,
        state.error=""
        state.users=action.payload.users
      })
      .addCase(updateUser.pending,(state)=>{
        state.loading=true

      })
      .addCase(updateUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload.error
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.loading=false,
     state.users=state.users.map((user)=>user._id===action.payload.user._id?action.payload.user:user)
      })
  },
});

export default adminSlice.reducer;
