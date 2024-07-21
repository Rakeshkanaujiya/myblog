import React from "react";
import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import './resetpassword.css'
import { baseURL } from "../../baseurl";

function ResetPassword() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(`${baseURL}/api/auth/resetpassword/${id}`, {
          id,
          password,
        })
        .then((res) => {
          if (res.data.status === "success") {
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="resetPassword">
      <div className="resetPasswordWrap">
        <span className="resetPasswordTitle">Forget Password</span>
        <form action="" className="resetPasswordForm" onSubmit={handleSubmit}>
          <label htmlFor="">New Password</label>
          <input
            type="text"
            className="resetPasswordInput"
            required
            autoFocus={true}
            placeholder="Enter New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="resetPasswordButton" type="submit">
            Update
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>{}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
