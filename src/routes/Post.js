import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postNames } from '../blog/posts'
import DisplayMarkdown from '../components/special/DisplayMarkdown/DisplayMarkdown'


const Post = () => {
  const {blogid} = useParams()
  // Lets parse this
  const validID = parseInt(blogid)
  const navigate = useNavigate()
  if (!validID) {
    navigate("/404")
    return null;
  }
  const fetchedPosts = {}
  postNames.forEach((post, i) => {
    if (validID === post.id) {
      fetchedPosts.fullTitle = post.fullTitle ? post.fullTitle : "Generic Title"
    }
  })
  return (
    <div>
      <DisplayMarkdown fileName={fetchedPosts.fullTitle}/>
    </div>
  )
}

export default Post