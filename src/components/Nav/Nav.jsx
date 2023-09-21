// import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import logoImg from "../../images/Logo.svg";
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";






function Nav() {
  const user = useSelector((store) => store.user);
  const { pathname } = useLocation();
  const [open, setState] = useState(false);


  /*
  function that is being called every time the drawer should open or close,
  the keys tab and shift are excluded so the user can focus between
  the elements with the keys
  */
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  // you can check a more conditions here
  if (pathname === "/login" || pathname === "/registration") return null;


  return (
    <AppBar className='background-primary-blue' position="static" sx={{ backgroundColor: '#005e83' }}>
      <Container className='background-primary-blue' maxWidth="xl" disableGutters="true">
        <Toolbar className='display-flex nav-spacing'>

          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, flexGrow: 1, fontWeight: 700 }}>
            <div className='display-flex items-center'>
              <img className='logo-img' src={logoImg} alt="" />
              <p className='nav-title'>Stickit</p>
            </div>

          </Typography>

          {/* <Box component="div" sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'block'
            }
          }}>
            <LogOutButton />
          </Box> */}

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: {
                // xs: 'block',
                // sm: 'block',
                md: 'none',
                lg: 'none'
              }
            }}
          >
            <MenuIcon />
            <span className='p-l-l'>Home</span>
          </IconButton>
          <Box component="div" sx={{
            display: {
              xs: 'block',
              sm: 'block',
            }
          }}>
            <LogOutButton className='sign-out' />
          </Box>

          {/* The outside of the drawer */}
          <Drawer
            PaperProps={{
              sx: { width: "55%" },
            }}
            //from which side the drawer slides in
            anchor="left"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={toggleDrawer(false)}
            //function that is called when the drawer should open
            onOpen={toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box sx={{
              height: 1,
              backgroundColor: "#FFF",
            }}>

              <div onClick={toggleDrawer(false)} className='display-flex m-t-l m-b-xl'>
                <img className='logo-img-black full-nav-logo' style={{ fill: 'white' }} src={logoImg} alt="" />
                <h1 className='text-black side-nav-title'>Stickit</h1>
              </div>

              <Box sx={{ mb: 2 }}>
                <ListItemButton>
                  <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemText primary="My Activity" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemText primary="Other" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemText primary="Exercises" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemText primary="Routines" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemText primary="Goals" />
                </ListItemButton>
              </Box>

              <Box sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                bottom: "0",
                left: "50%",
                width: '75%',
                transform: "translate(-50%, 0)"
              }}
              >
              </Box>

            </Box>

          </Drawer>


        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
