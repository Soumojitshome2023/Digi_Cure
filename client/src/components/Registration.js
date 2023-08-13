import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Registration.css';
import log_reg_page_pic from "./image/log_reg_page_pic.jpg";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

function RegistrationForm({ type }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const [registrationSuccessModalOpen, setRegistrationSuccessModalOpen] = useState(false);
  const [alreadyRegisteredModalOpen, setAlreadyRegisteredModalOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email); // Use 'email' instead of 'contact'
    formData.append('password', password);
    formData.append('avatar', image);

    try {
      const response = await axios.post('https://digi-cure-server.onrender.com/register', formData);

      setName('');
      setEmail('');
      setPassword('');
      setImage('');
      window.alert('Registration Succesful !!');
      navigate('/login');
    } catch (error) {
      window.alert('registration failed!! try again')
      console.error('Registration error:', error);
    }
  };

  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])

    // console.log(e.target.files[0].name)
    setImageUploaded(true);
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
                <input className="reg_input reg_input-alt" placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span className="reg_input-border reg_input-border-alt"></span>
              </div>
              {imageUploaded ? (
                <div id='img_success'>
                  <p>Image Upload Successful</p>
                </div>
              ) : (

                <div className="file_upload_sec">
                  <label htmlFor="input_file" id='input_file_label'>
                    <div className="input-div">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
                    </div>
                    <span>Upload Image</span>
                  </label>
                  <input
                    className="input-file"
                    id="input_file"
                    name="avatar" // Change 'file' to 'avatar'
                    type="file"
                    onChange={handleImageUpload}
                  />
                </div>

              )}

              <button className="button" type="submit" >
                <span className="button-content">Register</span>
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default RegistrationForm;

