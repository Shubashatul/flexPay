import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the user state type
interface UserState {
    isLoading: boolean;
    user: any; // Replace with a proper type if you have the user model
    error: string | null;
}

const initialState: UserState = {
    isLoading: false,
    user: null,
    error: null,
};


export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
        const response = await axios.get("https://api.flexpay.raj100xdev.me/api/user/getInfo", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
           
        });
        
    

        return response.data;
       
    }

    throw new Error("No token found");
});

// Create the slice
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}, // Add synchronous reducers if needed
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.user = action.payload.data;
            })
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "An error occurred";
            });
    },
});

export default UserSlice.reducer;
