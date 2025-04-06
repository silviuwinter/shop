// login page 
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { AuthService } from '../services/auth/auth.service';

const Login = () => {
  // form data (email + password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // error message
  const [error, setError] = useState('');
  // success message
  const [success, setSuccess] = useState('');
  // show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // move between pages
  const setAuth = useUserStore((state) => state.setAuth); // save auth data

  // update form data when typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, // keep old data
      [e.target.name]: e.target.value, // update field
    });
  };

  // view password
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // toggle state
  };

  // handle login form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop page reload
    setError(''); // clear error
    setSuccess(''); // clear success

    try {
      const response = await AuthService.login(formData); // send login data
      setAuth(response); // save auth data
      setSuccess('Login successful!'); // show success
      navigate('/'); // go to homepage
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred'); // show error
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
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} {/* show error */}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>} {/* show success */}
          <form onSubmit={handleSubmit}> {/* login form */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#D3D3D3' }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange} // update email
                required
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'} // show/hide password
                value={formData.password}
                onChange={handleChange} // update password
                required
                fullWidth
                sx={{ backgroundColor: 'white' }}
                InputProps={{
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility} sx={{ minWidth: 'auto' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />} {/* toggle icon */}
                    </Button>
                  ),
                }}
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
            onClick={() => navigate('/register')} // go to register page
          >
            New customer? Register here
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;