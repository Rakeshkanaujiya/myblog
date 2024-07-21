import React from 'react'
import "./forgetpassword.css"
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../baseurl';

export default function ForgetPassword() {
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`${baseURL}/api/auth/forgetpassword`, { email })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === "success") {
            alert('Check Your mail')
            navigate("/login");
          }else(
            setErrorMsg(res.data)
          )
        })
        .catch((err) => console.log(err));
    };
  return (
    <div className="forgetPassword">
      <div className="forgetPasswordWrap">
        <span className="forgetPasswordTitle">Forget Password</span>
        <form action="" className="forgetPasswordForm" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="forgetPasswordInput"
            required
            autoFocus={true}
            placeholder="Enter Your Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="forgetPasswordButton" type="submit">
            Send
          </button>
        </form>
        <p style={{ marginTop: "10px"}} className='text-center'>{errorMsg}</p>
      </div>
    </div>
  );
}