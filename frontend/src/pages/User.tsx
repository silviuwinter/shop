import { Box, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

function formatPhoneNumber(phoneNumber) {
  // formats phone number
  const cleaned = phoneNumber.replace(/\D/g, ''); // removes anything that's not a number
  return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
}

export default function User() {
  const auth = useUserStore((state) => state.auth); // gets auth info from the store
  const user = auth?.user; // grabs user data if logged in
  const navigate = useNavigate(); // lets us move to other pages

  if (!user) {
    // if no user is logged in, show this message
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 4, ml: 4 }}>
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 8, fontSize: '1.5rem' }}>
          No user data available. Please log in.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', pt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        {/* main user info section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          {/* user picture and buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              alt="User Picture"
              src={"/images/regular_guy.jpg"} // default pic
              sx={{ width: 200, height: 200 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}
                onClick={() => navigate(`/user/edit/${user.id}`)} // go to edit user page
              >
                Edit User
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}
                onClick={() => {
                  useUserStore.getState().clearAuth(); // logs the user out
                  navigate('/login'); // send to login page
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
          {/* user details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {user.name} {/* shows the user's name */}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '100px' }}>
                Username:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {user.username} {/* shows the username */}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '100px' }}>
                Address:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {user.address} {/* shows the address */}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '100px' }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {user.email} {/* shows the email */}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '100px' }}>
                Phone:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {formatPhoneNumber(user.phone_number)} {/* formats phone number */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
