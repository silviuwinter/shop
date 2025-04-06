import 'react-phone-input-2/lib/style.css';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  Avatar,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { updateUser, UpdateUserPayload } from '../services/users/users';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { auth, setUser } = useUserStore(); // get user info and a function to update it
  const navigate = useNavigate(); // for redirecting to another page
  const [formData, setFormData] = useState<UpdateUserPayload>({
    username: '',
    name: '',
    email: '',
    address: '',
    phone_number: '',
  }); // holds the form data
  const [error, setError] = useState(''); // shows error messages
  const [success, setSuccess] = useState(''); // shows success messages

  useEffect(() => {
    if (auth) {
      const user = auth.user || {}; // get user info if logged in
      setFormData(user); // pre-fill the form with user data
    }
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // update form field when typing
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone_number: value, // update phone number when typing
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop page reload
    setError(''); // clear old errors
    setSuccess(''); // clear old success messages

    // check if username is valid (letters, numbers, underscores only)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores, and must not contain spaces.');
      return;
    }

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const updatedUser = await updateUser(formData); // send updated data to the server
      setSuccess('User updated successfully!'); // show success message
      setUser(updatedUser); // update user info in the app
      setTimeout(() => navigate('/user')); // go back to user page after a bit
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred'); // show error if something goes wrong
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
            Edit Your Profile
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              alt="User Picture"
              src={"/images/regular_guy.jpg"} // default profile pic
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {formData.name || 'Your Name'}
            </Typography>
          </Box>
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
                  country={'at'} // default country code
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
                  countryCodeEditable={false} // don't let user change country code
                  enableAreaCodes={true} // allow area codes
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserEdit;
