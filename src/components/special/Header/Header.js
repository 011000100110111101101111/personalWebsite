import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import { HeaderStyles } from './style';
// Components

const Header = ({title, open, toggleDrawer, children, themeToggle, theme}) => {
  return (
    <Box sx={HeaderStyles.wrapper}>
      <Box sx={HeaderStyles.themeMode}>
        <IconButton sx={{ ml: 1 }} onClick={themeToggle.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Box sx={{marginLeft: '1rem', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Typography variant='h6'>
            Nexus
          </Typography>
        </Box>
      </Box>
      <Box sx={HeaderStyles.title}>
        {title}
      </Box>
      <Box sx={HeaderStyles.nav}>
        <Navigation
          open={open}
          toggleDrawer={toggleDrawer}
          children={children}
        />
      </Box>
    </Box>
  )
}

export default Header