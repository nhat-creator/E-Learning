import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  courses: [],
  loading: false,
  error: null,
};
export const fetchCoursesByCategory = createAsyncThunk(
  "fetchCoursesByCategory",
  async (maDanhMuc, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const courseByCategoryReducer = createSlice({
  name: "courseByCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesByCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchCoursesByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default courseByCategoryReducer.reducer;
