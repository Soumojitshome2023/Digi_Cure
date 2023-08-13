import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyProfile.css';
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [uri, setUri] = useState('https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg');


  const callProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const mail = localStorage.getItem('mail');
      if (!token) {
        navigate('/login');
      }
      const response = await axios.get('https://digi-cure-server.onrender.com/profile', {
        params: {
          mail: mail
        }
      });

      const data = response.data.user;
      console.log(data);
      setUserDetails(data);
      setUri(data.avatar.secure_url);

    } catch (error) {
      console.error(error);
      navigate('/login'); // Navigate to login page
    }
  };

  useEffect(() => {
    callProfile();
  }, []);

  const logoutProfile = async (e) => {
    e.preventDefault();
    try {
      // await axios.get("http://localhost:3001/logout", {
      //   headers: {
      //     Cookie: "token"
      //   },
      //   withCredentials: true // Include credentials, if needed (for cookies)
      // });
      localStorage.clear();

      window.alert("Logged out");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }
  const ListService = () => {
    navigate("/list-service");
  }
  const Feedback = () => {
    navigate("/Feedback");
  }

  return (
    <>
      <Navbar />
      <div className='myproflie_main_body'>
        <h1>Your Profile</h1>
        <div className="myprofile_main_card">
          <div className="myprofile_pic_card">
            <img src={uri} alt="user_pic" className="image" />
            <p>Hey {userDetails.name}</p>
          </div>

          <div className="myprofile_right_sec">

            <h1>Your Details</h1>
            <div className="myprofile_details">
              <ul>
                <li>Name: {userDetails.name}</li>
                <li>UserId: {userDetails._id}</li>
                <li>Email: {userDetails.email}</li>
                <li></li>
              </ul>
            </div>
            {/* <button id='my_prof_logout_btn' onClick={logoutProfile}>logout</button> */}
            {/* <button id='my_prof_serv_btn' onClick={ListService}>List Your Service</button> */}

            <div className="myproflie_btns">

              <button className="myproflie_button" onClick={logoutProfile}>
                <p className="text">logout</p>
              </button>
              <button className="myproflie_button" onClick={ListService}>
                <p className="text">Register As Doctor</p>
              </button>
              <button className="myproflie_button" onClick={Feedback}>
                <p className="text">Give Feedback</p>
              </button>
              {/* <NavLink className='mypfeedback_btn' to="/Feedback">
              <button className='myproflie_button'>Give Feedback</button></NavLink> */}
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default MyProfile;
