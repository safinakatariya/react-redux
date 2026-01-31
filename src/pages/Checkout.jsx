
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Typography, Button, Stack } from '@mui/material'

export default function Checkout() {
  const { items } = useSelector(s => s.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [timer, setTimer] = useState(5)
  const total = items.reduce((s, i) => s + i.price * (i.quantity || 1), 0)
  React.useEffect(() => {
    let interval
    if (paymentSuccess) {
      interval = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(interval)
            dispatch({ type: 'cart/emptyCart' })
            navigate('/')
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [paymentSuccess, dispatch, navigate])

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        {paymentSuccess ? (
          <>
            <Typography variant="h5" color="success.main">Payment Success!</Typography>
            <Typography mt={2}>Redirecting to home in {timer} seconds...</Typography>
          </>
        ) : (
          <>
            <Typography variant="h5">Checkout</Typography>
            <Stack spacing={2} mt={2}>
              {items.map(i => (
                <Paper key={i.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Typography>{i.title}</Typography>
                    <Typography color="text.secondary">${i.price} x {i.quantity || 1} = ${i.price * (i.quantity || 1)}</Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Button variant="outlined" size="small" onClick={() => dispatch(decrementQuantity(i.id))}>-</Button>
                    <Typography>{i.quantity || 1}</Typography>
                    <Button variant="outlined" size="small" onClick={() => dispatch(incrementQuantity(i.id))}>+</Button>
                    <Button color="error" onClick={() => dispatch(removeFromCart(i.id))}>Remove</Button>
                  </div>
                </Paper>
              ))}
            </Stack>
            <Typography variant="h6" mt={3}>Total: ${total}</Typography>
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => setPaymentSuccess(true)} disabled={items.length === 0}>Proceed to Payment</Button>
          </>
        )}
      </Paper>
    </Container>
  )
}
