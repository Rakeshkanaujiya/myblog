import { useState } from 'react';
import './register.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { baseURL } from '../../baseurl';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState("")
  const status = "success"

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/api/auth/register`, {
        username,
        email,
        password,
      });
      console.log(res.data);
      if(res.data === "success"){
        setMsg("account created successfully");
        setInterval(() => {
          window.location.replace("/login")
        }, 2000);
      }else{
        setMsg("User already exist");
      }

    } catch (err) {
    }
  
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="">UserName</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter Your UserName..."
          autoFocus={true}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter Your Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <div style={{ marginTop: "5px", fontWeight: "bold" }}>{msg}</div>
    </div>
  );
}
