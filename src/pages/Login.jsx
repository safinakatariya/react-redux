
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'
import { Container, TextField, Button, Paper, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState("emilys")
  const [password, setPassword] = useState("emilyspass")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, loading, token } = useSelector(s => s.auth)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading} onClick={() => dispatch(loginUser({ username, password }))}>
          {loading ? "Signing in..." : "Login"}
        </Button>
      </Paper>
    </Container>
  )
}
