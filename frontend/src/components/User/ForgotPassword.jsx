import React, { useState } from "react";

import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      console.log(email)
      e.preventDefault();
      Axios.post("https://organizemi-v1-server.onrender.com/api/v1/user/forgot-password", {
        email,
      }).then(response => {
        console.log(response)
          if(response.data.status) {
            alert("check you email for reset password link")
              navigate('/Login')
          }
          
      }).catch(err => {
          console.log(err)
      })
    };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        


        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ForgotPassword
