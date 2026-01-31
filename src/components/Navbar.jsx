
import React from 'react'
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const count = useSelector(s => s.cart.items.length)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
            Shopping Shopping
          </a>
        </Typography>
        <IconButton component={Link} to="/checkout" color="inherit">
          <Badge badgeContent={count} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
