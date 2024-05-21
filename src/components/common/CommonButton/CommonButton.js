import Button from '@mui/material/Button';
import React from 'react';

const CommonButton = ({ children, color, disabled, size, variant, sx, onClick }) => {
  return (
    <Button
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      sx={sx}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default CommonButton