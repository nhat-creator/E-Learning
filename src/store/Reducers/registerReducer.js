import api from "../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userRegister: null,
  loading: false,
  error: null,
};
export const registerUser = createAsyncThunk(
  "registerUser",
  async (nd, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/DangKy", nd);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);  
const registerReducer = createSlice({
  name: "registerReducer",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userRegister = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default registerReducer.reducer;