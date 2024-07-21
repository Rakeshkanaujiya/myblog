import React, { useContext, useEffect, useState } from 'react'
// import "./singlePost.css";
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Context from '../../context/Context';
import { baseURL } from '../../baseurl';
import Footer from '../footer/Footer';

function SinglePost() {
  useEffect(()=>{
    // console.log('SOCKET TO', socket);
  },[])


  const {user} = useContext(Context);
  const PF = `${baseURL}/images/`;
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  // console.log(id);
  const [post, setPosts] = useState({})
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  useEffect( ()=>{
    const getPost = async ()=>{
      const res = await axios.get(`${baseURL}/api/posts/${id}`);
      // console.log(res);
      setPosts(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc);
    }
    getPost();
  },[id])

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`${baseURL}/api/posts/${post._id}`, {
        email: user.email,
        username: user.username,
        title,
        desc,
      });
      // window.location.reload()
      setUpdateMode(false);

    } catch (err) {}
  };

  //Comment
  const [comment, setComment] = useState('')
  const addComment = async (e) => {
    e.preventDefault();
     console.log(comment);
    try {
      const { data } = await axios.put(`${baseURL}/api/comment/${id}`, {
        comment,
      });
      if (data) {
        // setComment("");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };

  return (
    <>
      <div className="singlePost flex justify-center w-[100%]">
        <div className="singlePostWrapper w-[80%] ">
          {post.photo && (
            <img
              className="singlePostImg w-full h-[450px] mt-10 mb-10 rounded-lg shadow-lg"
              src={PF + post.photo}
              alt=""
            />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput w-[100%] text-center text-3xl font-bold text-gray-700 focus:outline-none border-b-2 mb-10"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle flex text-3xl font-bold text-gray-700">
              <div className=" w-[95%] text-center">
                <span className="ml-20">{title}</span>
              </div>
              {post.email == user?.email && (
                <div className="singlePostEdit w-24 flex justify-around text-xl">
                  <i
                    className="singlePostIcon text-indigo-600 cursor-pointer fa-regular fa-pen-to-square"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon text-red-500 cursor-pointer fa-solid fa-trash"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}
          {updateMode ? (
            <textarea
              style={{ height: "250px" }}
              name=""
              id=""
              value={desc}
              className="singlePostDescInput w-[100%] focus:outline-none border-b-2 text-gray-700 text-xl font-semibold mb-5"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          ) : (
            <p className="first-letter:text-5xl mb-5 text-gray-700 text-xl font-semibold">
              {desc}
            </p>
          )}

          {updateMode && (
            <div className="flex justify-center">
              <button
                className="singlePostBtn bg-indigo-500 text-white p-2 w-[20%] rounded-lg hover:bg-indigo-700"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          )}
          <div className="singlePostInfo flex justify-between mb-10 mt-5">
            <span className="singlePostAuther">
              <span className="font-semibold">Auther : </span>
              <Link
                className="link text-amber-800"
                to={`/?user=${post.username}`}
              >
                <b>{post.username}</b>
              </Link>
            </span>
            <div>
              <span className="singlePostDate font-semibold">
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* <form action="" onClick={addComment}>
        Comment:
        <div>
          <textarea name="" id=""></textarea>
        </div>
        <button type="submit" onChange={(e) => setComment(e.target.value)}>
          Submit
        </button>
      </form> */}
      </div>
      <Footer/>
    </>
  );
}

export default SinglePost
