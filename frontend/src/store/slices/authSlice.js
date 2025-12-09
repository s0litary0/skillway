import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService"
import api, { setAuthToken } from "../../services/api";


// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    console.log("Trying to login")
    const data = await AuthService.loginApi({ username, password });
    localStorage.setItem("access", data.access); // save token
    localStorage.setItem("refresh", data.refresh); // save token
    // setAuthToken(data.access);
    console.log(`Set auth token for headers in axios: ${data.access}`)
    return data;
  }
);

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  console.log("Trying to fetch me")
  // setAuthToken(localStorage.getItem("access"));
  console.log("Token: ", localStorage.getItem("access"))
  const data = await AuthService.getMeApi(localStorage.getItem("access"));
  return data;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("access") || null,
    user: null,
    profile: null,
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.profile = null;
      state.stats = null;
      localStorage.removeItem("access");
      setAuthToken(null)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.stats = action.payload.stats;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
