import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  registeredCourses: [],
  loading: false,
  error: null,
};
export const registerCourse = createAsyncThunk(
  "registerCourse",
  async (tkdk, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyKhoaHoc/DangKyKhoaHoc", tkdk);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelCourse = createAsyncThunk(
  "cancelCourse",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyKhoaHoc/HuyGhiDanh", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerCoursesReducer = createSlice({
  name: "registerCoursesReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.registeredCourses.push(action.payload);
    });
    builder.addCase(registerCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(cancelCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cancelCourse.fulfilled, (state, action) => {
      state.loading = false;
      // You can add logic here to update state after cancellation if needed
    });
    builder.addCase(cancelCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default registerCoursesReducer.reducer;
