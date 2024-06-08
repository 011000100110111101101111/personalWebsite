import ConstructionIcon from '@mui/icons-material/Construction';
import { Button, Stack, Typography } from '@mui/material';
import { Image } from 'mui-image';
import { useNavigate } from 'react-router-dom';
import wip from '../assets/images/underConstructionIcon.png';
import { recentPosts } from '../blog/recentPosts';
import Articles from '../components/special/Articles/Articles';

const Home = () => {
  const navigate = useNavigate()
  return (
    <Stack direction='column' alignItems='center' justifyContent='space-between' marginBottom={12} spacing={4}>
      <Typography variant='h1'>

      </Typography>
      <Typography variant='h4'>
        Welcome to my collection!
      </Typography>
      <Image src={wip} fit='contain'/>
      <Typography variant='subtitle1' sx={{borderBottom: '1px solid black'}}>
        <ConstructionIcon />
        This website is currently under heavy construction.
        <ConstructionIcon />
      </Typography>
      <Typography variant='h2'>
        Recent Posts
      </Typography>
      <Typography variant='subtitle2'>
        None of these images are my own
      </Typography>
      <Articles
        posts={recentPosts}
        pageSize={3}
      />
      <Button
        variant='outlined'
        onClick={() => { navigate('/blog') }}
      >
        More Posts
      </Button>
      <Typography sx={{borderTop: '1px solid black'}}>
      </Typography>
    </Stack>
    // <Box sx={{display: 'flex', alignContent: 'space-between', justifyContent: 'space-between'}}>
    //   <Grid container spacing={2} direction='column'>
    //     <Grid item xs>
    //       <Typography variant='h1'>

    //       </Typography>
    //     </Grid>
    //     <Grid item xs display='flex' justifyContent='center' alignItems='center'>
    //       <Typography variant='subtitle1'>
    //         Welcome to my collection!
    //       </Typography>
    //     </Grid>
    //     <Grid item xs display='flex' justifyContent='center' alignItems='center'>
    //       <Image src={wip} fit='contain'/>
    //     </Grid>
    //     <Grid item xs display='flex' justifyContent='center' alignItems='center'>
    //       <Typography variant='subtitle1'>
    //         This website is currently under heavy construction.
    //       </Typography>
    //     </Grid>
    //     <Grid item xs display='flex' justifyContent='center' alignItems='center'>
    //       <Typography variant='h2'>
    //         Recent Posts
    //       </Typography>
    //     </Grid>
    //     <Grid item xs display='flex' justifyContent='center' alignItems='center'>
    //       <Articles
    //         posts={recentPosts}
    //         pageSize={3}
    //       />
    //     </Grid>
    //     <Grid item xs display='flex' justifyContent='center' alignItems='center'>
    //       <Button
    //       variant='outlined'
    //       onClick={() => { navigate('/blog') }}
    //       >
    //         More Posts
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </Box>
  )
}

export default Home



/*

Home should have,

          Header (4 rem)
          (2 rem gap)
xxx Some centered picture xxx
xxx     Welcome ...       xxx
x     Top Blog Posts?       x
          (2 rem gap)
          Footer? (4 rem)

*/