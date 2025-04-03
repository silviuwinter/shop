import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // Ensure react-router-dom is used for navigation
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useUserStore } from '../../store/userStore';

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.auth?.token);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const DrawerList = (
    <Box sx={{ width: 250, pt: 8 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Admin Tools
      </Typography>
      <List>
        <ListItem component={Link} to="/products/create" sx={{ color: 'black' }}>
          <ListItemText primary="Create Product" sx={{ color: 'black' }} />
        </ListItem>
        <ListItem component={Link} to="/statistics" sx={{ color: 'black' }}>
          <ListItemText primary="Statistics" sx={{ color: 'black' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#D3D3D3', top: 0, zIndex: 1201 }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: 'black',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            component={Link}
            to="/home"
          >
            iStore
          </Typography>

          {/* User Info or Login/Register Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isLoggedIn ? (
              <button
                onClick={() => navigate('/user')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'black',
                }}
              >
                <PersonIcon />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'none',
                    border: '1px solid black',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    color: 'black',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    background: 'none',
                    border: '1px solid black',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    color: 'black',
                  }}
                >
                  Register
                </button>
              </>
            )}
            {/* Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'black',
              }}
            >
              <ShoppingCartIcon />
            </button>
          </Box>

          {/* Open Drawer */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ ml: 2, color: 'black' }}
            onClick={toggleDrawer(true)}
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Toolbar>
      </AppBar>
      {/* Add margin to the main content */}
      <Box sx={{ mt: 12 }}>
        {/* Main content goes here */}
      </Box>
    </>
  );
}

export default Navbar;