// store/authSlice.ts
import useApi from "@/composable/api";
import { AuthResponse, User } from "@/composable/auth";
import { Local_STORAGE_TOKEN_KEY } from "@/utils/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to load current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const api = useApi()
      const token = localStorage.getItem(Local_STORAGE_TOKEN_KEY);
      if(token){
      const res = await api<AuthResponse>("/auth/me", 'GET'); // <- your API endpoint
      console.log(res)
      return res.user; // must be { id, name, email } etc
      }
    } catch (err) {
      localStorage.removeItem(Local_STORAGE_TOKEN_KEY)
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);
interface Type {
  user: User | null
  token: string | null
  error: { message: string } | unknown | null
  status: 'loading' | 'succeeded' | 'failed' | null
  loading: boolean

}
const initialState: Type = { user: null, token: null, loading: false, error: null, status: null }
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  save: (state, action) => {
    state = {...action.payload}
    
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.loading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.user = action.payload!;
        state.loading = false
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.user = null;
        state.loading = false
      });
  },
});

export const { logout, save } = authSlice.actions;
export default authSlice.reducer;