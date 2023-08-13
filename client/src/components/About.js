import React, { useState } from 'react';
import Navbar from "./Navbar";
import "./About.css";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import Footer from './Footer'
import faq_left_pic from "./image/faq_left_pic.jpg"

const AboutUsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className='About_bg'>
        <Navbar />

        <main id='about_main'>

          <section id='about_heading'>
            ABOUT <span>US</span>
          </section>
          <section id='about_middle'>

            <section id='about_left_sec'>
              <img src={faq_left_pic} alt="pic" />

              <section id='about_faq_sec'>
                <section id='faq_heading'>
                  FA<span>Q</span>
                </section>

                <section className='faqs' onClick={() => toggleFaq(0)}>
                  <div className="faqs_heading" >
                    Q: How can I find doctors near me?
                  </div>
                  <div className="faqs_desc" style={{ height: openIndex === 0 ? '250px' : '0' }}>
                    A:To find doctors near you, simply enter your location or zip code in the search bar on our website. We will then display a list of qualified doctors and healthcare professionals in your area, along with their specialties and contact information
                  </div>
                </section>

                <section className='faqs' onClick={() => toggleFaq(1)}>
                  <div className="faqs_heading" >
                    Q: What types of doctors can I find on your website?
                  </div>
                  <div className="faqs_desc" style={{ height: openIndex === 1 ? '250px' : '0' }}>
                    A: Our website lists a wide range of healthcare professionals, including general practitioners, specialists (e.g., cardiologists, dermatologists, pediatricians), dentists, psychiatrists, and more. You can filter the search results based on your specific needs and preferences
                  </div>
                </section>

                <section className='faqs' onClick={() => toggleFaq(2)}>
                  <div className="faqs_heading" >
                    Q: How do I book an appointment with a doctor I find on your website?
                  </div>
                  <div className="faqs_desc" style={{ height: openIndex === 2 ? '250px' : '0' }}>
                    Booking an appointment is easy. Once you have selected a doctor from the list, click on their profile to view their availability. You can then choose a suitable date and time and follow the booking instructions provided. Some doctors may offer online booking, while others may require you to call their office directly.
                  </div>
                </section>

                <section className='faqs' onClick={() => toggleFaq(3)}>
                  <div className="faqs_heading" >
                    Q: Are the doctors on your website verified and licensed?
                  </div>
                  <div className="faqs_desc" style={{ height: openIndex === 3 ? '250px' : '0' }}>
                    A: Yes, we take the verification and licensing of doctors seriously. All the healthcare professionals listed on our website are required to provide valid credentials and proof of licensure before being included in our database. We regularly update and verify their information to ensure accuracy and compliance with relevant regulations.
                  </div>
                </section>
                <section className='faqs' onClick={() => toggleFaq(4)}>
                  <div className="faqs_heading" >
                    Q: Can I read reviews and ratings for the doctors on your website?
                  </div>
                  <div className="faqs_desc" style={{ height: openIndex === 4 ? '250px' : '0' }}>
                    Yes, we encourage patients to leave reviews and ratings based on their experiences with the doctors. You can find these reviews on each doctors profile. Reading patient reviews can provide valuable insights into the doctors expertise, bedside manner, and overall patient satisfaction.
                  </div>
                </section>
              </section>

            </section>

            <section id='about_right_sec'>
              Welcome to Digi-Cure, your premier destination for reliable medical information and compassionate care. At Digi-Cure, we are dedicated to empowering individuals with accurate health insights and connecting them with top-notch medical professionals.
              <br /><br />
              Our mission is to be your trusted source for all things related to health and wellness. Whether you're seeking information about a specific medical condition, exploring treatment options, or looking for expert advice, our comprehensive resources are here to guide you.

              <br /><br />
              Our team of experienced medical professionals is committed to providing you with the highest level of care. We understand that navigating the complexities of healthcare can be daunting, which is why we strive to make your journey as smooth as possible. Our user-friendly platform ensures easy access to valuable articles, videos, and resources that cover a wide range of medical topics.
              <br /><br />

              At Digi-Cure, we believe that everyone deserves the best possible care. That's why we work tirelessly to deliver accurate and up-to-date information, promoting informed decisions about your health. Whether you're a patient, caregiver, or simply someone who wants to stay well-informed, we invite you to explore our website and join us on the path to a healthier and happier life. Your well-being is our priority, and we're here to support you every step of the way.
            </section>
          </section>


        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutUsPage;
