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
  CircularProgress,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { updateUser, UpdateUserPayload } from '../services/users/users';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { auth, setUser } = useUserStore(); // Access user and setUser from Zustand store
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState<UpdateUserPayload>({
    username: '',
    name: '',
    email: '',
    address: '',
    phone_number: '',
  }); // Initialize formData with empty fields
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [profilePreviewUrl, setProfilePreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (auth) {
      const user  = auth.user || {};
      setFormData(user);
    }
  }, [auth]);

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

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfilePreviewUrl(reader.result?.toString() || '');
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores, and must not contain spaces.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const updatedUser = await updateUser(formData);
      setSuccess('User updated successfully!');
      setUser(updatedUser); // Update user in Zustand store
      setTimeout(() => navigate('/user')); // Redirect to main page after 2 seconds
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setIsUploading(false);
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
              <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="outlined" color="secondary" component="label" disabled={isUploading}>
                  Change your Profile Picture
                  <input type="file" accept="image/*" hidden onChange={handleProfileFileChange} />
                </Button>
                {isUploading && <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
                {profilePreviewUrl && !isUploading && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Image Preview:</Typography>
                    <img src={profilePreviewUrl} alt="Profile preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                  </Box>
                )}
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
