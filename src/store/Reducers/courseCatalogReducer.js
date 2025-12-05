import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  courseCatalog: null,
  courses: null,
  error: null,
};

export const fetchCourseCatalog = createAsyncThunk(
  "fetchCourseCatalog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const courseCatalogReducer = createSlice({
  name: "courseCatalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseCatalog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCourseCatalog.fulfilled, (state, action) => {
      state.loading = false;
      state.courseCatalog = action.payload;
    });
    builder.addCase(fetchCourseCatalog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default courseCatalogReducer.reducer;
