import api from "../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvedCourses: [],
  unregisteredCourses: [],
  pendingCourses: [],
  loading: false,
  error: null,
};

export const fetchApprovedCourses = createAsyncThunk(
  "registration/fetchApprovedCourses",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
        { taiKhoan : taiKhoan } // Gửi dưới dạng object
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPendingCourses = createAsyncThunk(
  "registration/fetchPendingCourses",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
        { taiKhoan : taiKhoan } // Gửi dưới dạng object
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUnregisteredCourses = createAsyncThunk(
  "registration/fetchUnregisteredCourses",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registationByUserReducer = createSlice({
  name: "registationByUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedCourses = action.payload;
      })
      .addCase(fetchApprovedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPendingCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingCourses = action.payload;
      })
      .addCase(fetchPendingCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUnregisteredCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnregisteredCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.unregisteredCourses = action.payload;
      })
      .addCase(fetchUnregisteredCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registationByUserReducer.reducer;
