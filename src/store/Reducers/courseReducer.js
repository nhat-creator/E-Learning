import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  course: [],
  loading: false,
  error: null,
};

export const deleteCourse = createAsyncThunk(
  "deleteCourse",
  async (maKhoaHoc, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCourse = createAsyncThunk(
  "updateCourse",
  async (kh, { rejectWithValue }) => {
    try {
      const response = await api.put("QuanLyKhoaHoc/CapNhatKhoaHoc", kh);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addCourse = createAsyncThunk(
  "addCourse",
  async (kh, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyKhoaHoc/ThemKhoaHoc", kh);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    });
    builder.addCase(updateCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
     builder.addCase(addCourse.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(addCourse.fulfilled, (state, action) => {
       state.loading = false;
       state.course = action.payload;
     });
     builder.addCase(addCourse.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload;
     });
  },
});
export default courseReducer.reducer;
