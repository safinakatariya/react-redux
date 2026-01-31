
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice'
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material'

export default function Home() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.products)
  const cartItems = useSelector(s => s.cart.items)

  useEffect(() => { dispatch(fetchProducts()) }, [])

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {items.map(p => {
          const cartItem = cartItems.find(i => i.id === p.id)
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 6,
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 12,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={p.thumbnail}
                  alt={p.title}
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    transition: 'filter 0.3s',
                    '&:hover': { filter: 'brightness(0.95)' },
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {p.title}
                  </Typography>
                  <Typography color="primary" fontWeight={500} fontSize={18}>
                    ${p.price}
                  </Typography>
                </CardContent>
                {cartItem ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                      gap: 12,
                      background: '#f5f5f5',
                      borderRadius: 8,
                      padding: '8px 0',
                      transition: 'background 0.2s',
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => dispatch(decrementQuantity(p.id))}
                      sx={{
                        minWidth: 36,
                        fontWeight: 700,
                        borderRadius: 2,
                        '&:hover': { background: '#ffeaea' },
                      }}
                    >
                      –
                    </Button>
                    <Typography sx={{ mx: 1, fontWeight: 600, fontSize: 18 }}>
                      {cartItem.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={() => dispatch(incrementQuantity(p.id))}
                      sx={{
                        minWidth: 36,
                        fontWeight: 700,
                        borderRadius: 2,
                        '&:hover': { background: '#eaffea' },
                      }}
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => dispatch(addToCart(p))}
                    sx={{
                      m: 2,
                      borderRadius: 2,
                      fontWeight: 600,
                      background: 'linear-gradient(90deg, #19d22c 60%, #42f551 100%)',
                      boxShadow: 3,
                      transition: 'background 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #65c015 60%, #7af664 100%)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
