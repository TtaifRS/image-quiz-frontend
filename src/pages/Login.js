import React from 'react'
import { Button, TextField, Grid, Box, Typography, Container } from "@mui/material"
import { useTokenStore } from '../store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const token = useTokenStore((state) => state.token)
  const error = useTokenStore((state) => state.error)
  const fetchLogin = useTokenStore((state) => state.fetchLogin)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email')
    const password = data.get('password')
    const fetch = async () => {
      await fetchLogin(email, password)
    }
    fetch()
    if (token !== null) {
      navigate('/')
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

        </Box>
      </Box>
      <Box>
        {error ? (
          <p>{error}</p>
        ) : ''}
      </Box>

    </Container>
  );
}

export default Login