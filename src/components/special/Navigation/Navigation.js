import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import MenuButton from '../../generic/MenuButton/MenuButton';
import NavBarItems from './NavBarItems';
import navbarStyles from './navbarStyles';

import { useNavigate } from 'react-router-dom';



const Navigation = ({open, toggleDrawer, children}) => {
  const navigate = useNavigate();
  const DrawerList = (
    <Box sx={ navbarStyles.wrapper } role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {NavBarItems.map(
          (item) => (
            <ListItem
              key={item.id}
              disablePadding
              onClick={() => navigate(item.route)}
            >
              <ListItemButton>
                <ListItemIcon sx={navbarStyles.icons}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={navbarStyles.text}>
                  {item.text}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );


  return (
    <MenuButton
      color='primary'
      variant='text'
      size='small'
      onClick={toggleDrawer(true)}
      sx={navbarStyles.menu}
      >
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor='right'
      >
        {DrawerList}
      </Drawer>
      <MenuIcon />
    </MenuButton>
  )
}

export default Navigation