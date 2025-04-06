import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // navigation between pages
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useUserStore } from '../../store/userStore';

function Navbar() {
  const [open, setOpen] = useState(false); // keeps track if the drawer is open or closed
  const navigate = useNavigate(); // helps to navigate between pages
  const isLoggedIn = useUserStore((state) => state.auth?.token); // checks if the user is logged in

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    // opens or closes the drawer
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return; // ignore tab/shift key presses
    }
    setOpen(open); // set drawer state
  };

  const DrawerList = (
    <Box sx={{ width: 250, pt: 8 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {/* admin tools menu */}
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Admin Tools
      </Typography>
      <List>
        <ListItem component={Link} to="/products/create" sx={{ color: 'black' }}>
          <ListItemText primary="Create Product" sx={{ color: 'black' }} /> {/* link to create product */}
        </ListItem>
        <ListItem component={Link} to="/statistics" sx={{ color: 'black' }}>
          <ListItemText primary="Statistics" sx={{ color: 'black' }} /> {/* link to view stats */}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#D3D3D3', top: 0, zIndex: 1201 }}>
        <Toolbar>
          {/* app logo */}
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
            to="/"
          >
            iStore
          </Typography>

          {/* user actions */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isLoggedIn ? (
              <button
                onClick={() => navigate('/user')} // go to user profile
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'black',
                }}
              >
                <PersonIcon /> {/* user icon */}
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')} // go to login page
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
                  onClick={() => navigate('/register')} // go to register page
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
            {/* cart button */}
            <button
              onClick={() => navigate('/cart')} // go to cart page
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'black',
              }}
            >
              <ShoppingCartIcon /> {/* cart icon */}
            </button>
          </Box>

          {/* menu drawer button */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ ml: 2, color: 'black' }}
            onClick={toggleDrawer(true)} // open drawer
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
          >
            <MenuIcon /> {/* menu icon */}
          </IconButton>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList} {/* admin tools drawer */}
          </Drawer>
        </Toolbar>
      </AppBar>
      {/* margin to avoid overlapping with navbar */}
      <Box sx={{ mt: 12 }}>
        {/* main content goes here */}
      </Box>
    </>
  );
}

export default Navbar;