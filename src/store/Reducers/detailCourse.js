import api from "../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    course: null,
    loading: false,
    error: null,
};
export const fetchCourseDetail = createAsyncThunk(
    "fetchCourseDetail",
    async (maKhoaHoc, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const detailCourseReducer = createSlice({
    name: "detailCourse",
    initialState,  
    reducers: {},   
    extraReducers: (builder) => {
        builder.addCase(fetchCourseDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCourseDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.course = action.payload;
        }); 
        builder.addCase(fetchCourseDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default detailCourseReducer.reducer;