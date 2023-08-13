import Navbar from './Navbar'
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import './doctors.css';

const doctorsData = [
  { id: 1, link: 'https://rzp.io/l/uJ9TXVb6B', name: 'Dr. Parijat Debchoudhry', specialization: 'Cardiologist', Experience: '20+ years', Location: 'Mukundapur AMRI Hospital', Fees: '500', availableDays: ['Monday', 'Sunday', 'Wednesday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 2, link: 'https://rzp.io/l/dYstCjMGSv', name: 'Dr. Soumyakanti Dutta', specialization: 'Cardiologist', Experience: '15+ years', Location: 'Chandannagar Hospital', Fees: '1200', availableDays: ['Monday', 'Sunday', 'Wednesday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 3, link: 'https://rzp.io/l/TXif8Cu', name: 'Dr. Sumanta Chatterjee', specialization: 'Dermatologist', Experience: '14+ years', Location: 'Beleghata ID Hospital', Fees: '700', availableDays: ['Monday', 'Sunday', 'Wednesday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 4, link: 'https://rzp.io/l/QvNVernesv', name: 'Dr. Soumyabrata Acharya', specialization: 'Pediatrician', Experience: '10+ years', Location: 'SSKM Hospital', Fees: '800', availableDays: ['Monday', 'Wednesday', 'Sunday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 5, link: 'https://rzp.io/l/4eTnS6ls', name: 'Dr. Dipanwita Roy', specialization: 'Pediatrician', Experience: '5+ years', Location: 'KOLkata Medical College & Hospital', Fees: '1000', availableDays: ['Monday', 'Sunday', 'Wednesday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 6, link: 'https://rzp.io/l/tzaRoz2D', name: 'Dr. John Smith', specialization: 'Cardiologist', Experience: '18+ years', Location: 'City Hospital', Fees: '900', availableDays: ['Tuesday', 'Thursday', 'Sunday'], availableHours: ['9:00 AM', '1:00 PM', '4:00 PM'] },
  { id: 7, link: 'https://rzp.io/l/OikBlKjcs', name: 'Dr. Emily Brown', specialization: 'Dermatologist', Experience: '12+ years', Location: 'Community Clinic', Fees: '1100', availableDays: ['Monday', 'Wednesday', 'Sunday', 'Friday'], availableHours: ['11:00 AM', '3:00 PM', '6:00 PM'] },
  { id: 8, link: 'https://rzp.io/l/esqnvmmD16', name: 'Dr. Laura Johnson', specialization: 'Pediatrician', Experience: '16+ years', Location: 'Women\'s Health Center', Fees: '950', availableDays: ['Monday', 'Sunday', 'Thursday'], availableHours: ['9:30 AM', '2:30 PM', '5:30 PM'] },
  { id: 9, name: 'Dr. Michael Wilson', specialization: 'Cardiologist', Experience: '22+ years', Location: 'OrthoCare Hospital', Fees: '1200', availableDays: ['Monday', 'Wednesday', 'Friday'], availableHours: ['9:00 AM', '1:00 PM', '4:00 PM'] },
  { id: 10, name: 'Dr. Rachel Adams', specialization: 'Dermatologist', Experience: '14+ years', Location: 'Mind Wellness Clinic', Fees: '1000', availableDays: ['Tuesday', 'Thursday'], availableHours: ['10:30 AM', '2:30 PM', '5:30 PM'] },
  { id: 11, name: 'Dr. Maria Garcia', specialization: 'Cardiologist', Experience: '17+ years', Location: 'HeartCare Clinic', Fees: '850', availableDays: ['Tuesday', 'Thursday', 'Saturday'], availableHours: ['9:30 AM', '2:30 PM', '5:30 PM'] },
  { id: 12, name: 'Dr. William Lee', specialization: 'Dermatologist', Experience: '13+ years', Location: 'Skin Health Center', Fees: '950', availableDays: ['Monday', 'Wednesday', 'Friday'], availableHours: ['11:00 AM', '3:00 PM', '6:00 PM'] },
  { id: 13, name: 'Dr. Elizabeth Taylor', specialization: 'Pediatrician', Experience: '9+ years', Location: 'ChildCare Clinic', Fees: '750', availableDays: ['Tuesday', 'Thursday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 14, name: 'Dr. James Anderson', specialization: 'Cardiologist', Experience: '20+ years', Location: 'Heartbeat Hospital', Fees: '1100', availableDays: ['Wednesday', 'Friday'], availableHours: ['9:00 AM', '1:00 PM', '4:00 PM'] },
  { id: 15, name: 'Dr. Anna Martinez', specialization: 'Dermatologist', Experience: '14+ years', Location: 'Glow Skin Care', Fees: '800', availableDays: ['Monday', 'Thursday'], availableHours: ['10:30 AM', '2:30 PM', '5:30 PM'] },
  { id: 16, name: 'Dr. Benjamin White', specialization: 'Pediatrician', Experience: '11+ years', Location: 'Healthy Kids Clinic', Fees: '900', availableDays: ['Monday', 'Tuesday', 'Wednesday'], availableHours: ['9:00 AM', '1:00 PM', '4:00 PM'] },
  { id: 17, name: 'Dr. Emma Carter', specialization: 'Cardiologist', Experience: '19+ years', Location: 'HeartWell Clinic', Fees: '950', availableDays: ['Tuesday', 'Thursday'], availableHours: ['10:00 AM', '2:00 PM', '5:00 PM'] },
  { id: 18, name: 'Dr. Daniel Brown', specialization: 'Dermatologist', Experience: '15+ years', Location: 'Radiant Skin Center', Fees: '1050', availableDays: ['Wednesday', 'Friday'], availableHours: ['9:30 AM', '2:30 PM', '5:30 PM'] },
  { id: 19, name: 'Dr. Olivia Adams', specialization: 'Pediatrician', Experience: '12+ years', Location: 'Little Ones Clinic', Fees: '700', availableDays: ['Monday', 'Wednesday'], availableHours: ['11:00 AM', '3:00 PM', '6:00 PM'] },
  { id: 20, name: 'Dr. Matthew Smith', specialization: 'Cardiologist', Experience: '18+ years', Location: 'HeartCare Clinic', Fees: '1000', availableDays: ['Tuesday', 'Thursday'], availableHours: ['10:30 AM', '2:30 PM', '5:30 PM'] },
  // Add more doctor data here
];

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };

  const currentDateTime = new Date();
  const currentDayIndex = currentDateTime.getDay(); // Get the index of the current day (0 for Sunday, 1 for Monday, etc.)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[currentDayIndex];
  const currentTime = currentDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  

  const availableDoctors = doctorsData.filter(doctor => {
    const isAvailableDay = doctor.availableDays.includes(currentDay);
    const isAvailableHour = doctor.availableHours.some(time => time >= currentTime);
    return isAvailableDay && isAvailableHour;
  });

  const filteredDoctors = availableDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialization === '' ||
        doctor.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase()))
  );

  return (
    <>
      < Navbar />
      <div className="doctors-list-container">
        <h1>Doctors List</h1>
        <div className="search-filter-container">
          <input
            type="text" className='doctors_find_input'
            placeholder="Search by doctor's name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
          >
            <option value="">All Specializations</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            {/* Add more specialization options here */}
          </select>
        </div>
        {/* <ul className="doctors-list">
          {filteredDoctors.map((doctor) => (
            <li key={doctor.id} className="doctor-item">
              <h3>{doctor.name}</h3>
              
              <button className='doctors_btn' onClick={() => handleOpenModal(doctor)}>View Details</button>
            </li>
          ))}
        </ul> */}
        <section id='serv_cards'>
          
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="card">
              <div className="content">
                <p className="heading">{doctor.name}</p>
                
                  <button className="btn" onClick={() => handleOpenModal(doctor)}>View Details</button>
          
              </div>
            </div>
          ))}
        </section>
        {selectedDoctor && (
          <Modal
            isOpen={true}
            onRequestClose={handleCloseModal}
            contentLabel="Doctor Details"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <h2>Doctor Details</h2>
            <p><b>Name:</b> {selectedDoctor.name}</p>
            <p><b>Specialization:</b> {selectedDoctor.specialization}</p>
            <p><b>Experience:</b> {selectedDoctor.Experience}</p>
            <p><b>Location:</b> {selectedDoctor.Location}</p>
            <p><b>Fees:</b> {selectedDoctor.Fees}</p>
            <p><b>availableDays:</b> {selectedDoctor.availableDays}</p>
            <p><b>availableHours:</b> {selectedDoctor.availableHours}</p>
            <button className='doctors_btn' onClick={handleCloseModal}>Close</button>
            <a href={selectedDoctor.link} target='__blank'>
            <button className='doctors_btn'>Book Now</button>
            </a>
          </Modal>
        )}
        <NavLink className="doctors_navlink" to="/Feedback">
          <button className='doctors_btn'>Give Feedback</button>
        </NavLink>
      </div>

    </>
  );
};

export default DoctorsList;
