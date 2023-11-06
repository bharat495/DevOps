import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Devops from "../Assets/logo.png";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  const jwtStudentToken = Cookies.get('student_token');
  const jwtAdminToken = Cookies.get('admin_token');
  const isStudentLoggedIn = jwtStudentToken ? true : false;
  const isAdminLoggedIn = jwtAdminToken ? true : false;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async (role) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/${role}/logout`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Define a function to handle the scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar className="appbar" style={{ background: scrolled ? 'rgb(1, 1, 37)' : 'transparent', boxShadow: 'none', transition: 'background 0.3s ease' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6} md={2}>
                <Box display="flex" alignItems="center">
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <img className="logo" src={Devops} width="20%" style={{ marginRight: "20px", marginLeft: "20px" }} alt="DevOps" />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    DevOps
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={10}>
                {/* Rest of your code for desktop view */}
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Link className='menue' style={{ textDecoration: 'none', color: 'white' }} to='/home'>
                      <Button sx={{ my: 2, color: 'white' }}>Home</Button>
                    </Link>
                    <Link className='menue' style={{ textDecoration: 'none', color: 'white' }} to='/members'>
                      <Button sx={{ my: 2, color: 'white' }}>Members</Button>
                    </Link>
                    <Link className='menue' style={{ textDecoration: 'none', color: 'white' }} to='/events'>
                      <Button sx={{ my: 2, color: 'white' }}>Events</Button>
                    </Link>
                    <Link className='menue' style={{ textDecoration: 'none', color: 'white' }} to='/contact'>
                      <Button sx={{ my: 2, color: 'white' }}>Contact</Button>
                    </Link>
                    {
                      isAdminLoggedIn ?
                        <>
                          <Link className='menue' style={{ textDecoration: 'none', color: 'white' }} to='/admin/postmember'>
                            <Button sx={{ my: 2, color: 'white' }}>Post Member</Button>
                          </Link>
                          <Link className='menue' style={{ textDecoration: 'none', color: 'white' }} to='/admin/postevents'>
                            <Button sx={{ my: 2, color: 'white' }}>Post Events</Button>
                          </Link>
                        </>
                        : null
                    }
                  </Box>
                  <Box className='menue' display="flex">
                    {
                      !isStudentLoggedIn && !isAdminLoggedIn && (
                        <>
                          <Link className='menue' style={{ textDecoration: 'none' }} to='/student/login'>
                            <Button variant="contained" sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>
                              Student Login
                            </Button>
                          </Link>
                          <Link className='menue' style={{ textDecoration: 'none' }} to='/admin/login'>
                            <Button variant="contained" sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>
                              Admin Login
                            </Button>
                          </Link>
                        </>
                      )
                    }
                    {isStudentLoggedIn && (
                      <Button
                        variant="contained"
                        sx={{ my: 2, color: 'black', backgroundColor: 'white' }}
                        onClick={() => handleLogout("student")}
                      >
                        Logout
                      </Button>
                    )}
                    {isAdminLoggedIn && (
                      <Button
                        variant="contained"
                        sx={{ my: 2, color: 'black', backgroundColor: 'white' }}
                        onClick={() => handleLogout("admin")}
                      >
                        Logout
                      </Button>
                    )}
                  </Box>
                </Box>
              
              </Grid>
               
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <div>
          <Link to='/home'>
            <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Home</Button>
          </Link>
          <Link to='/members'>
            <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Members</Button>
          </Link>
          <Link to='/events'>
            <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Events</Button>
          </Link>
          <Link to='/contact'>
            <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Contact</Button>
          </Link>
          {
            isAdminLoggedIn ?
              <>
                <Link to='/admin/postmember'>
                  <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Post Member</Button>
                </Link>
                <Link to='/admin/postevents'>
                  <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Post Events</Button>
                </Link>
              </>
              : null
          }
          {!isStudentLoggedIn && !isAdminLoggedIn && (
            <>
              <Link to='/student/login'>
                <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Student Login</Button>
              </Link>
              <Link to='/admin/login'>
                <Button sx={{ my: 2, color: 'black', backgroundColor: 'white' }}>Admin Login</Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default NavBar;
