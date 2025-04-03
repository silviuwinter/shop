import 'react-phone-input-2/lib/style.css';
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
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { AuthService } from '../services/auth/auth.service';
import { RegisterRequest } from '../services/auth/dto/auth.dtos';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    address: '',
    phone_number: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const setAuth = useUserStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone_number: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric and underscores only
    if (!usernameRegex.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores, and must not contain spaces.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await AuthService.register(formData as RegisterRequest);
      console.log(response);
      
      setAuth(response); // Store auth data in zustand
      setSuccess('Registration successful!');
      navigate('/home'); // Redirect to home page after registration
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
          bgcolor: '#D3D3D3'
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Create an Account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#D3D3D3' }}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
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
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                fullWidth
                placeholder="e.g., Streetname nr. 1, Cityname PLZ"
                sx={{ backgroundColor: 'white' }} 
              />
              <Box sx={{ bgcolor: '#D3D3D3', p: 1, borderRadius: 1 }}>
                <PhoneInput
                  country={'at'}
                  value={formData.phone_number}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: 'phone_number',
                    id: 'phone_number',
                    placeholder: 'Phone Number',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '56px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                  countryCodeEditable={false}
                  enableAreaCodes={true}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
