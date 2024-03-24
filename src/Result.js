import React from 'react';
import backgroundImage from './assets/img/thing1.jpg';

function Results() {
  return (
    <div style={{ paddingTop: '150px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{ flex: '1 0 auto', marginLeft: '50px' }}> {/* Add this line */}
        <h1>Results</h1>
        <p>We are a team of dedicated software developers passionate about creating innovative solutions. Our mission is to deliver high-quality software that meets the needs of our clients and exceeds their expectations.</p>
        <h2>Our Team</h2>
        <p>Our team is composed of experienced developers, designers, and project managers who work collaboratively to deliver successful projects.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions or would like to discuss a potential project, please contact us at info@ourcompany.com.</p>
      </div>
      <footer style={{ flexShrink: '0' }}>
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
}

export default AboutUs;
