import ConstructionIcon from '@mui/icons-material/Construction';
import { Stack, Typography } from '@mui/material';
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
      <Image src={wip} fit='contain' showLoading/>
      <Typography variant='subtitle1' sx={{borderBottom: 'red 1px solid'}}>
        This website is currently under heavy construction.
      </Typography>
      <ConstructionIcon />
      <Typography variant='subtitle1' sx={{borderBottom: '1px solid red'}}>
      </Typography>
      <br />
      <br />
      <br />
      <br />
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
      {/* <Button
        variant='outlined'
        onClick={() => { navigate('/blog') }}
      >
        More Posts
      </Button> */}
      <Typography sx={{borderTop: '1px solid black'}}>
      </Typography>
    </Stack>
  )
}

export default Home