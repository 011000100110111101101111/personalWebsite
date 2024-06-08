import { Box, Grid, IconButton, Typography } from "@mui/material";
// import temp from '../../../routes/work1.jpeg';
import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaginationHelper } from '../../generic/Pagination/Pagination';
// import Articles from '../components/special/Articles/Articles'
import { Image } from 'mui-image';

const Articles = ({posts, pageSize}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedPosts = PaginationHelper(posts, pageSize);
  const currentPosts = paginatedPosts[currentPage - 1];
  const navigate = useNavigate()
  const images = require.context('../../../blog/thumbnail', true)
  return (
    <Grid container>
      {/* Now we want to loop through an array of our articles (From posts.js) and create items for them. */}
      {currentPosts && currentPosts.map((post) => {
        let img = images(`./${post.background}`);
        // xs 1 item, sm 2 items, md 3 items, lg 4 items, xl 5 items.
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={post.id} display='flex' justifyContent='center' alignItems='center'>
            <IconButton
              sx={{
                width: '100%',
                height: '100%',
                minWidth: '100%',
                borderRadius: '0px',
                // backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
              }}
              disableElevation
              disableRipple
              onClick={() => { navigate(`/post/${post.id}`) }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  // backgroundColor: 'blue'
                }}
              >
                <Box
                  sx={{
                    height: '60%',
                    width: '100%',

                    // backgroundColor: 'green'
                  }}
                >
                  <Image src={img} sx={{padding: '0px'}} fit="contain"/>
                </Box>
                <Box
                  sx={{
                    height: '5%',
                    width: '100%',
                    // backgroundColor: 'pink'
                  }}
                >
                  <Typography variant='subtitle2'>
                    {post.date}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '35%',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    // backgroundColor: 'yellow',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center'
                  }}
                >
                  <Typography variant='h5'>
                    {post.title}
                  </Typography>
                </Box>
              </Box>
            </IconButton>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        {paginatedPosts.length > 1 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={paginatedPosts.length}
              page={currentPage}
              onChange={(_, newPage) => setCurrentPage(newPage)}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
export default Articles;