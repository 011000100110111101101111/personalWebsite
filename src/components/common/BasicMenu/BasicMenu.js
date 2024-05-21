import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {menuItems.map(
        (items) => (
          <MenuItem
            onClick={handleClose}
          >
            {items.label}
          </MenuItem>
        )
      )}
    </Menu>
  );
}