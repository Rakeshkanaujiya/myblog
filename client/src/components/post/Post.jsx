import React from 'react'
import { Link } from 'react-router-dom';
// import './post.css'
import { baseURL } from '../../baseurl';

function Post({post}) {
  const PF = `${baseURL}/images/`;
  return (
    <>
      <div className="bg-white flex flex-col w-[450px] md:w-[400px]   items-center p-2 shadow-lg rounded-xl">
        {post.photo && (
          <img
            className=" shadow-lg rounded-md w-[350px] h-[300px] my-4"
            src={PF + post.photo}
            alt=""
          />
        )}
        <Link to={`/post/${post._id}`} className="link">
          <p className="text-3xl font-bold text-gray-600">{post.title}</p>
        </Link>

        <p className=" m-5 line-clamp-4  text-sm font-bold text-gray-400">
          {post.desc}
        </p>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </>
  );
}

export default Post
