import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  notRegisteredUsers: [],
  pendingUsers: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
        { maKhoaHoc: courseId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPendingUsers = createAsyncThunk(
  "fetchPendingUsers",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
        { maKhoaHoc: courseId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchNotRegisteredUsers = createAsyncThunk(
  "fetchNotRegisteredUsers",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`,
        { maKhoaHoc: courseId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const registationByCourseReducer = createSlice({
  name: "registationByCourseReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPendingUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPendingUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingUsers = action.payload;
    });
    builder.addCase(fetchPendingUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchNotRegisteredUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotRegisteredUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.notRegisteredUsers = action.payload;
    });
    builder.addCase(fetchNotRegisteredUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default registationByCourseReducer.reducer;
