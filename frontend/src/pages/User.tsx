import { Box, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

export default function User() {
  const auth = useUserStore((state) => state.auth); // Fetch auth from Zustand store
  const user = auth?.user; // Safely access user property
  const navigate = useNavigate(); // Add navigation hook

  if (!user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 4, ml: 4 }}>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 8, fontSize: '1.5rem' }}>
          No user data available. Please log in.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 4, ml: 4 }}>
      {/* User Info Section */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 4 }}>
        {/* User Picture */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="User Picture"
            src={"/images/regular_guy.jpg"} // Fallback to a default picture
            sx={{ width: 150, height: 150 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: '0.9rem', padding: '0.4rem 1rem', mt: 2 }}
            onClick={() => navigate(`/user/edit/${user.id}`)} // Navigate to edit page
          >
            Edit User
          </Button>
          <Button
            variant="contained"
            color="error" // Change to red color
            sx={{ fontSize: '0.9rem', padding: '0.4rem 1rem', mt: 2 }}
            onClick={() => {
              useUserStore.getState().clearAuth(); // Call logout function from Zustand store
              navigate('/login'); // Redirect to login page
            }}
          >
            Logout
          </Button>
        </Box>
        {/* User Details */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
            Name: {user.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Username: {user.username}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Address: {user.address}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Email: {user.email}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Phone: {user.phone_number}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
