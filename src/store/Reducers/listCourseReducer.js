import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const listCourseReducer = createSlice({
    name: "listCourses",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        }); 
        builder.addCase(fetchCourses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export default listCourseReducer.reducer;