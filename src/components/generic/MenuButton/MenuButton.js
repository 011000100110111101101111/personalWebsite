import Button from '@mui/material/Button';
import React from 'react';

const MenuButton = ({sx, color, variant, size, onClick, disabled, children}) => {
  return (
    <Button
      sx={sx}
      color={color}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default MenuButton