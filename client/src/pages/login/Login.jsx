import './login.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import Context from '../../context/Context';
import { baseURL } from '../../baseurl';
export default function Login() {
  const [errorMsg, setErrorMsg] = useState("")
  const usernameRef = useRef();
  const passwordRef = useRef()
  const {user, dispatch, isFetching} = useContext(Context);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, {
        email: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      
      if (res.data.status === "success"){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }
      else{
        setErrorMsg(res.data)
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  // console.log(isFetching);
  return (
    <div className="login">
      <span className="loginTitle">LogIn</span>
      <form action="" className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input
          type="text"
          className="loginInput"
          required
          ref={usernameRef}
          autoFocus={true}
          placeholder="Enter Your Email..."
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="loginInput"
          required
          ref={passwordRef}
          placeholder="Password"
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          LogIn
        </button>
      </form>
      <p style={{ marginTop: "10px" }} className='text-red-600 font-semibold'>{errorMsg}</p>
      <Link to="/forgetpassword">Forget Password</Link>
      <Link to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
}
