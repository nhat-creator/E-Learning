import api from "../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userLogin: null,
  loading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ taiKhoan, matKhau }, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/DangNhap", {
        taiKhoan,
        matKhau,
      });
      const authInfo = response.data;

      // Check user
      if (authInfo.maLoaiNguoiDung == "HV") {
        localStorage.setItem("USER_INFO", JSON.stringify(authInfo));
      } else {
        localStorage.setItem("ADMIN_INFO", JSON.stringify(authInfo));
      }
      return authInfo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUserLogin: (state) => {
      state.userLogin = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userLogin = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { clearError, clearUserLogin } = loginReducer.actions;
export default loginReducer.reducer;
