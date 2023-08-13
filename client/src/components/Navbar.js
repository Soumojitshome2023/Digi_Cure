import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import digicureicon from "./image/digicureicon.png";
import './Navbar.css';

const Navbar = () => {
  const [ulVisible, setUlVisible] = useState(true);
  
  const[isLogged,setIsLogged]=useState('Login');
  // const token =localStorage.getItem('token');
  // if(token){
  //   setIsLogged('Profile');
  // }
  const handleToggleClick = () => {
    setUlVisible(!ulVisible);
  };
  
  
  return (
    <div className='nav-cont'>

      <nav className="navbar">

        <div className="mobile">


          <NavLink className="nav-link" to="/" >

            <img src={digicureicon} className="navbar-brand"></img>
          </NavLink>

          <div className="tglbtn">
            <input type="checkbox" id="checkbox" onClick={handleToggleClick} />
            <label htmlFor="checkbox" className="toggle">
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>

          </div>
        </div>
        <ul id='navuls' style={{ height: ulVisible ? '' : '170px' }}>
          <li><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li>
          <NavLink className="nav-link" to="/doctors">Our Doctors</NavLink>
          </li>
          <li><NavLink className="nav-link" to="/About">About Us</NavLink></li>
          <li><NavLink className="nav-link" to="/Registration">Register</NavLink></li>
          <li>{localStorage.getItem("token") != null ? <NavLink className="nav-link" to="/profile">Profile</NavLink> :<NavLink className="nav-link" to="/login">Login</NavLink> } </li>
        </ul>



      </nav>

    </div>
  )
}

export default Navbar