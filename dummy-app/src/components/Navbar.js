import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAboutClick = () => {
    handleCloseNavMenu();
    props.navToAbout();
  }

  const handleContactClick = () => {
    handleCloseNavMenu();
    props.navToContact();
  }

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleSignUpClick = () => {
    navigate("/add");
  }
  const logo = "Spend2Save"

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='purpleNav'>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {logo}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleAboutClick}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleContactClick}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
              <MenuItem onClick={handleLoginClick}>
                <Typography textAlign="center">
                  <Link to="/login" className='navLink'>Login</Link>
                  
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleSignUpClick}>
                <Typography textAlign="center">SignUp</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {logo}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleAboutClick} 
            sx={{ my: 2, color: 'white', display: 'block' }}>
              About
            </Button>
            <Button onClick={handleContactClick} 
            sx={{ my: 2, color: 'white', display: 'block' }}>
              Contact
            </Button>
            <Button onClick={handleLoginClick} 
            sx={{ my: 2, color: 'white', display: 'block' }}>
              Login
            </Button>
            <Button onClick={handleSignUpClick} 
            sx={{ my: 2, color: 'white', display: 'block' }}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;