
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk("products/fetch", async()=>{
  const res = await axios.get("https://dummyjson.com/products")
  return res.data.products
})

const slice = createSlice({
  name:"products",
  initialState:{items:[], loading:false},
  extraReducers:(b)=>{
    b.addCase(fetchProducts.pending,(s)=>{s.loading=true})
     .addCase(fetchProducts.fulfilled,(s,a)=>{s.loading=false; s.items=a.payload})
  }
})

export default slice.reducer
