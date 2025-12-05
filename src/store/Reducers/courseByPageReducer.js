import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};
export const fetchCoursesByPage = createAsyncThunk(
  "fetchCoursesByPage",
  async ({ tenKhoaHoc, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${tenKhoaHoc}&page=${page}&pageSize=${pageSize}&MaNhom=GP01`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const courseByPageReducer = createSlice({
  name: "courseByPageReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesByPage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoursesByPage.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchCoursesByPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default courseByPageReducer.reducer;
