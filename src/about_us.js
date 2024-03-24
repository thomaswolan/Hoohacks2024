import React from 'react';
import backgroundImage from './assets/img/thing1.jpg';
import './App.css'; // Ensure you import the CSS file

function AboutUs() {
  return (
    <div className="aboutus-background">
      <div className="aboutus-container">
        <h1>About Us</h1>
        <p>Our goal was to demystify the stock market for beginners. We recognized the potential in leveraging technology to simplify the investment process, making it accessible and engaging for everyone. Apollo.ai stands as a testament to our commitment, offering a user-friendly interface that opens the doors to the world of stocks like never before.</p>
        <p>Apollo.ai was brought to life through a plethora of technologies and frameworks. At its core, the project harnesses the power of React and JavaScript for the frontend, paired seamlessly with Python and Flask powering the backend. Our decision to employ RandomForest for AI analysis, complemented by the robust styling of HTML/CSS and Bootstrap, and containerized with Docker, reflects our dedication to creating a resilient and scalable application.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions or would like to discuss a potential project, please contact us at fake_email@ourcompany.com.</p>
      </div>
    </div>
  );
}

export default AboutUs;
