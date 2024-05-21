import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { mainNavbarItems } from './consts/navbarItems';
import { navbarStyles } from './styles';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const DrawerList = (
    <Box sx={{ width: 210 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {mainNavbarItems.map(
          (item, index) => (
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
                  {item.label}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={navbarStyles.drawer}
        anchor="right"
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}