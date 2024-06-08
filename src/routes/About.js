import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

const About = () => {
  return (
    <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
      <Grid container spacing={8} direction='column'>
        <Grid item xs borderBottom='1px black solid'>
          <Typography variant='h1'>
            About
          </Typography>
        </Grid>
        <Grid item xs display='flex' justifyContent='center' alignItems='center'>
          <Typography variant='subtitle1'>
            Welcome to my collection!
          </Typography>
        </Grid>
        <Grid item xs display='flex' justifyContent='center' alignItems='center'>
          <Button variant='outlined'>
            Recent Posts
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default About