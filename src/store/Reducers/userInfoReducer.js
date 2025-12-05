import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};
export const getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.post(`QuanLyNguoiDung/ThongTinNguoiDung`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",
  async (nd, { rejectWithValue }) => {
    try {
        const response = await api.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, nd);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
);
const userInfoReducer = createSlice({
  name: "userInfoReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userInfoReducer.reducer;
