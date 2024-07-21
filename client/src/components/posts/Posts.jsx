import React from 'react'
// import './posts.css';
import Post from '../post/Post';

function Posts({posts}) {
  return (
    <div className="posts flex flex-wrap justify-center gap-5  mt-10">
      
        {posts.map((p, i) => (
          <Post key={i} post={p} />
        ))}
      </div>
  );
}

export default Posts
