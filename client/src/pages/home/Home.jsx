import React, { useEffect, useState } from 'react'
// import './home.css'
import Header from '../../components/header/Header'
import Posts from "../../components/posts/Posts";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { baseURL } from '../../baseurl';
import Footer from '../../components/footer/Footer';


function Home() {

  const {search} = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async()=>{
      const res = await axios.get(`${baseURL}/api/posts` + search);
      // console.log(res.data);
      setPosts(res.data)
      
    })()
  }, [search]);

  return (
    <div className=" bg-indigo-100">
      <Header />
      <Posts posts={posts} />
      <Footer/>
    </div>
  );
}

export default Home
