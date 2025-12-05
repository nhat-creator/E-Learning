import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    catalogs: [],
    loading: false,
    error: null,
};
export const fetchCatalogs = createAsyncThunk(
    "catalogs/fetchCatalogs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const catalogReducer = createSlice({
    name: "catalogs",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCatalogs.fulfilled, (state, action) => {
            state.loading = false;
            state.catalogs = action.payload;
        });
        builder.addCase(fetchCatalogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default catalogReducer.reducer;