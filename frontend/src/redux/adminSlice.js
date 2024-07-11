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
      return response.data;
    } catch (error) {
      if (error.response) {
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
    // console.log(response.data,"form fetchUsers")
    return response.data
  } catch (error) {
    if(error.response){
      return rejectWithValue(error.response.data)
    }else{
      // console.log(error,"is form the error ");
      return rejectWithValue({error:"internal Server error"})
    }
  }
})

export const updateUser=createAsyncThunk("updateUser",async(formData,{rejectWithValue})=>{
  try {
    const {id,...restData}=formData
    // console.log(id,":is the id from from data")
    const response=await axios.put(`http://localhost:5000/api/admin/updateUser/${id}`,restData,{withCredentials:true})

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

export const createNewUser=createAsyncThunk("createNewUser",async(formData,{rejectWithValue})=>{
  try {
    const response=await axios.post("http://localhost:5000/api/admin/createNewUser",formData,{withCredentials:true})
  
      return response.data
    
  } catch (error) {
    if(error.response){
      return rejectWithValue(error.response.data)
    }else{
      return rejectWithValue(error)
    }
  }
})

export const deleteUser=createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{
  try {
    const response =await axios.delete(`http://localhost:5000/api/admin/deleteUser/${id}`,{withCredentials:true})
    return { id, ...response.data };
  } catch (error) {
    if(error.response){
      return rejectWithValue(error.response.data)

    }else{
      return rejectWithValue({error:"internal server error"})
    }
  }
})

export const logOutAdmin=createAsyncThunk('logOutAdmin',async(_,{rejectWithValue})=>{
try {
  const response=await axios("http://localhost:5000/api/admin/logout",{withCredentials:true})
  return response
} catch (error) {
  return rejectWithValue(error)
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
        state.loading=false,
        state.error=action.payload.error
      })
      .addCase(fetchUser.fulfilled,(state,action)=>{
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
      .addCase(createNewUser.pending,(state)=>{
        state.loading=true
      })
      .addCase(createNewUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload.error
      })
      .addCase(createNewUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.error="",
        state.users.push(action.payload.user);
      })
      .addCase(deleteUser.pending,(state)=>{
        state.loading=true
      })
      .addCase(deleteUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload.error
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.error=""
        state.users=state.users.filter((value)=>value._id!=action.payload.id)
      })
      .addCase(logOutAdmin.pending,(state)=>{
        state.loading=true
      })
      .addCase(logOutAdmin.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload.error
      })
      .addCase(logOutAdmin.fulfilled,(state,action)=>{
        state.loading=false,
        state.error=""
        state.users.length==0
      })
  },
});

export default adminSlice.reducer;
