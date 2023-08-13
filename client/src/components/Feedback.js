import React , { useState } from 'react'
import Navbar from './Navbar'
// import Services from './Services'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import './Feedback.css';
import home_doctor_pic from "./image/home_doctor_pic.jpg"
import axios from 'axios';

const Feedback = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reveiw, setReveiw] = useState('');

    const giveFeedback=async ()=>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('reveiw', reveiw);
        const data = {
            name: name,
            reveiw: reveiw
          };
        try {
            const response = await axios.post('https://digi-cure-server.onrender.com/feedback', data);
              setName('');
              setReveiw('');
              console.log(response.message)
            window.alert('Thanks for the Feedback');
            navigate('/Feedback')
          } catch (error) {
            console.error('Registration error:', error);
          }
    }

    return (
        <div>

            <Navbar />

            <div className="bg">
                <ul className="glass">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>


                    <section id='feedback_sec'>
                        <section id='feedback_form'>
                            <h1>FeedBack</h1>


                            <div className="form-container">
                                <form className="form">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" required="" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group msg">
                                        <label htmlFor="textarea">How Can We Help You?</label>
                                        <input name="reveiw" id="textarea" required="" value={reveiw} onChange={(e) => setReveiw(e.target.value)}></input>
                                    </div>
                                    <button className="cssbuttons-io" onClick={giveFeedback}>
                                        Submit
                                    </button>
                                </form>
                            </div>

                        </section>

                    </section>
                </ul>
            </div>
        </div>
    )
}

export default Feedback