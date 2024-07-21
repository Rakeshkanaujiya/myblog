import React, { useContext } from 'react'
// import './topbar.css'
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import { baseURL } from '../../baseurl';

export default function TopBar() {
  const PF = `${baseURL}/images/`;
  const {user, dispatch} = useContext(Context)
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className="top w-full shadow-md bg-indigo-200 flex justify-around p-2 items-center ">
      <a
        className=" text-orange-700 bg-slate-200 font-bold text-lg md:text-2xl p-2 rounded-md shadow-md"
        href=""
      >
        <i className=" fa-solid fa-blog"></i> My
        <span className=" text-purple-600 shadow-lg">Blog</span>
      </a>
      <div className="topList  flex md:gap-6 md:text-lg font-bold text-indigo-800 ">
        <Link
          className=" p-2 rounded-md hover:text-indigo-600 hover:shadow-md link"
          to="/"
        >
          HOME
        </Link>
        <Link
          className="p-2 rounded-md hover:text-indigo-600 hover:shadow-md link"
          to="/write"
        >
          WRITE
        </Link>
        <span
          className=" flex items-center p-2 rounded-md hover:text-indigo-600 hover:shadow-md topListItem"
          onClick={handleLogout}
        >
          {user && "LOGOUT"}
        </span>
      </div>
      <div className="topRight">
        {user ? (
          <Link to={"/settings"}>
            {user.profilePic ? (
              <img
                className="w-10 h-10 rounded-full topImg"
                src={PF + user.profilePic}
                alt=""
              />
            ) : (
              <img
                className="w-10 h-10 rounded-full topImg"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            )}
          </Link>
        ) : (
          <ul className="topList flex gap-10 md:text-lg font-bold text-indigo-800">
            <li className="topListItem">
              <Link
                className="hover:text-indigo-600 p-2 hover:shadow-md rounded-md link"
                to="/login"
              >
                LOGIN
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
