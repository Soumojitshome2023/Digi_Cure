import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Registration.css';
import log_reg_page_pic from "./image/log_reg_page_pic.jpg";
import { useNavigate } from 'react-router-dom';

function CustomerRegistration({ type }) {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [role, setRole] = useState('DOCTOR');
  const [serviceId_link, setServiceId_link] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email); // Use 'email' instead of 'contact'
    formData.append('number', number);
    formData.append('role',role);
    formData.append('serviceId_link',serviceId_link);
    const customerData={
        name,email,number,role,serviceId_link
    }

  
    try {
      const response = await axios.post('https://digi-cure-server.onrender.com/registration',customerData );
      
        setName('');
        setEmail('');
        setNumber('');
        setRole('');
        setServiceId_link('');
        window.alert('Thanks for Registration, after some verification you will be notified');
        navigate('/profile')
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <main id='reg_main'>
        <section id='reg_left_sec'>
          <img src={log_reg_page_pic} alt="pic" />
        </section>
        <section id='reg_right_sec'>
          <div className="registration-form-container">
            <h1>Register {type}</h1> 
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="Email ID" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="Contact Number" type='tel' value={number} onChange={(e) => setNumber(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="role" type='role' value={role} onChange={(e) => setRole(e.target.value)}  readOnly />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              <div className="form-control">
                <input className="reg_input reg_input-alt" placeholder="serviceId_link" type='link' value={serviceId_link} onChange={(e) => setServiceId_link(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              
              <button className="button" type="submit" >
                <span className="button-content">Register Your service</span>
              </button>
            </form>
          </div>
        </section>
        
      </main>
    </>
  );
}

export default CustomerRegistration;

