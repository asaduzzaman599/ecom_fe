// store/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
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
});

export const { logout, save } = authSlice.actions;
export default authSlice.reducer;