import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  registeredCourses: null,
  loading: false,
  error: null,
};
export const joinCourse = createAsyncThunk(
  "joinCourse",
  async (tkdk, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyKhoaHoc/GhiDanhKhoaHoc", tkdk);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const cancelJoinCourse = createAsyncThunk(
  "cancelJoinCourse",
  async (tkdk, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyKhoaHoc/HuyGhiDanh", tkdk);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const joinCoursesReducer = createSlice({
  name: "joinCoursesReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(joinCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(joinCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.registeredCourses = action.payload;
    });
    builder.addCase(joinCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(cancelJoinCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cancelJoinCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.registeredCourses = action.payload;
    });
    builder.addCase(cancelJoinCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default joinCoursesReducer.reducer;
