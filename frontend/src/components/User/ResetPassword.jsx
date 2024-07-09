import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const {resetPassToken} = useParams()
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(resetPassToken)
      Axios.post("https://organizemi-v1-server.onrender.com/api/v1/user/reset-password/"+resetPassToken, {
        password,
      }).then(response => {
        console.log(response)
          if(response.data.status) {
              navigate('/Login')
          }
          console.log(response.data)
      }).catch(err => {
          console.log(err)
      })
    };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  )
}

export default ResetPassword
