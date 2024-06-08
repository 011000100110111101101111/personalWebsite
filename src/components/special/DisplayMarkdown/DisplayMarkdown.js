import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import fm from 'front-matter';
import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from 'react';
import MarkdownHighlight from '../../generic/MarkdownHighlight/MarkdownHighlight';


const BlogPost = ({fileName}) => {
  const [postContent, setPostContent] = useState('');
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    import(`/public/posts/${fileName}`)
      .then(res => fetch(res.default)
        .then(res => res.text())
        .then(content => {
          const { attributes, body } = fm(content);
          setMetadata(attributes);
          setPostContent(body);
        })
      )
      .catch(err => console.log(err));
  }, [fileName]); // [] means this effect runs only once on mount

  return (
    <Box
      sx={{
        padding: '20px',
      }}
    >
      <Typography variant='h4'>
        {metadata.title}
      </Typography>
      <Markdown
        options={{
          overrides: {
            pre: MarkdownHighlight,
          },
        }}
      >
        {postContent}
      </Markdown>

    </Box>
  )
}
export default BlogPost