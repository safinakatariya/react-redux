
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username: data.username,
      password: data.password
    }, {
      headers: { "Content-Type": "application/json" }
    })
    return res.data
  } catch (err) {
    return rejectWithValue("Invalid username or password")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false
        s.user = a.payload
        s.token = a.payload.accessToken
        localStorage.setItem("token", a.payload.accessToken)
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
