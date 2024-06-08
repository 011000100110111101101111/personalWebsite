import { Box } from '@mui/material';
import React from 'react';
import { postNames } from '../blog/posts';
import Articles from '../components/special/Articles/Articles';
// import Articles from '../components/special/Articles/Articles'

// I am using a post I found that has nice pagination for blogs for this. Not my own work on this page.
// Now lets work through this and customize it for ourselves

const Blog = () => {
  // const [posts] = useState({postNames})


  return (
    <Box
      sx={{
        paddingBottom: '2rem',
      }}
    >
      <Articles
        posts={postNames}
        pageSize={9}
      />
    </Box>

  )
}

export default Blog