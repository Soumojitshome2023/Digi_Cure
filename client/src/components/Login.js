import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './Registration.css';
import log_reg_page_pic from "./image/log_reg_page_pic.jpg";

function LoginForm () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (event) => {
    localStorage.clear();
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    const data = {
        email: email,
        password: password
      };

    try {
      const response = await axios.post('https://digi-cure-server.onrender.com/login', data);
      console.log('Login successful:', response.data);
      document.cookie = `token=${response.data.token}; path=/;`;
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('mail',data.email);
      
      setEmail('');
      setPassword('');
      localStorage.setItem('token', response.data.token);
      

      window.alert('Login successful');
      navigate("/profile");
    } catch (error) {
      window.alert('Login Failed!! Please Enter Details Correctly')
      console.error('Login error:', error);
    }
  };
  // const ForgotPassword=()=>{
  //   const response = await axios.post('http://localhost:3001/login', data);
  // }

  return (
    <>
      <Navbar />
      <main id='reg_main'>
        <section id='reg_left_sec'>
          <img src={log_reg_page_pic} alt="pic" />
        </section>
        <section id='reg_right_sec'>
          <div className="registration-form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="Email ID" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              <button className="button" type="submit">
                <span className="button-content">Login</span>
              </button>
              {/* <button className="button" type="forgot">
                <span className="button-content" onClick={ForgotPassword}>forgot password</span>
              </button> */}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default LoginForm;
