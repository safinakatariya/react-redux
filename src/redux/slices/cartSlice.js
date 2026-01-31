
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (s, a) => {
      const item = s.items.find(i => i.id === a.payload.id)
      if (item) {
        item.quantity += 1
      } else {
        s.items.push({ ...a.payload, quantity: 1 })
      }
    },
    emptyCart: (s) => {
      s.items = []
    },
    removeFromCart: (s, a) => {
      s.items = s.items.filter(i => i.id !== a.payload)
    },
    incrementQuantity: (s, a) => {
      const item = s.items.find(i => i.id === a.payload)
      if (item) item.quantity += 1
    },
    decrementQuantity: (s, a) => {
      const item = s.items.find(i => i.id === a.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        s.items = s.items.filter(i => i.id !== a.payload)
      }
    },
  }
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, emptyCart } = slice.actions
export default slice.reducer
