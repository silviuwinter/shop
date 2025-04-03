import React, { useState } from 'react';

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { AuthService } from '../services/auth/auth.service';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const setAuth = useUserStore((state) => state.setAuth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await AuthService.login(formData);
      setAuth(response); // Store auth data in zustand
      setSuccess('Login successful!');
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
          boxShadow: 6,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: '#D3D3D3',
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Login to Your Account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#D3D3D3' }}>
              <TextField
                label="Email"
                name="email" // Updated to "email"
                type="email" // Updated to "email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </form>
          <Button
            variant="text"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/register')}
          >
            New customer? Register here
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;