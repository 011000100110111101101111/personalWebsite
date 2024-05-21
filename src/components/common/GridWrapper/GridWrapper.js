import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { gridWrapperStyles } from './styles';

const GridWrapper = ({ children }) => {
  return (
    <Grid item xs={12} sx={gridWrapperStyles}>
      {children}
    </Grid>
  )
}

export default GridWrapper