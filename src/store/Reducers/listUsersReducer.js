import api from "../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  listUsers: [],
  loading: false,
  error: null,
};
export const fetchListUsers = createAsyncThunk(
  "fetchListUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const listUsersReducer = createSlice({
  name: "listUsersReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.listUsers = action.payload;
    });
    builder.addCase(fetchListUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default listUsersReducer.reducer;
