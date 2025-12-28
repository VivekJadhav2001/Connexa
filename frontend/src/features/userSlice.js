import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const { data } = await axios.get("http://localhost/api/user/profile", { withCredentials: true });
    return data;
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                    state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            });
    }
})

export default userSlice.reducer;