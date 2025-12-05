import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};
export const addNewUser = createAsyncThunk(
  "addNewUser",
  async (nd, { rejectWithValue }) => {
    try {
      const response = await api.post("/QuanLyNguoiDung/ThemNguoiDung", nd);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const findUserInfo = createAsyncThunk(
  "findUserInfo",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(findUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(findUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });
    builder.addCase(findUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userReducer.reducer;
export const { clearUserError } = userReducer.actions;
