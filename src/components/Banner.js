import { useState, useEffect, useCallback, useMemo } from "react";
import React, { useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/new-header.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the arrow right icon
import { useNavigate } from 'react-router-dom';




export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100 - Math.random() * 100);
  const [searchText, setSearchText] = useState('');
  // Use the useNavigate hook

  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate('/results', { state: { searchText: searchText } }); // Navigate to Results page
  };

  const toRotate = useMemo(() => ["Web Developer", "Software Engineer", "Virginia Tech"], []);

  const tick = useCallback(() => {
  }, [loopNum, toRotate, isDeleting, text, setDelta, setIsDeleting, setLoopNum]);

  useEffect(() => {
  }, [tick, delta]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = async (event) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
      // Prevent the default action to avoid submitting the form (if any)
      event.preventDefault();
  
      // Assuming your backend expects a POST request to a specific endpoint to handle the search
      // Replace 'http://localhost:5000/search' with your actual backend endpoint
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchText }),
      });
  
      if (response.ok) {
        // If the request was successful, navigate to the Results page
        // You can also pass any response data you might need on the Results page as state
        const responseData = await response.json(); // Assuming the backend sends back some data
        navigate('/search', { state: { responseData } }); // Pass the responseData as state to the Results page
      } else {
        // Handle any errors, e.g., showing an error message to the user
        console.error('Failed to fetch search results');
      }
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <h1>{`The Future of Investing.`}</h1>
          <div className="search-bar">
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Find stock by name - Ex: GOOG, AAPL, AMZN, etc."
              className="modern-search mt-2"
            />
            <Button variant="outline-primary" type="button" onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </Row>
        <SettingsDropdown />
      </Container>
    </section>
  );
};


export const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClick = async () => {
    const Risk = document.getElementById('Risk').value;
    const term = document.getElementById('term').value;
    const diversification = document.getElementById('diversification').value;

    const response = await fetch('http://127.0.0.1:5000/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Risk, term, diversification })
    });

    if (response.ok) {
      navigate('/results'); // Navigate to the Results page
    } else {
      // handle error
    }
  };

  <button className="submit-button" onClick={handleClick}>Submit</button>
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  return (


    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
      <FontAwesomeIcon icon={faCog} style={{ marginRight: '7px' }} /> Generate Personalized Recommendations
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div>
            <label htmlFor="Risk">Risk</label>
            <input type="range" id="Risk" name="Risk" min="0" max="5" />
          </div>
          <div>
            <label htmlFor="term">Short Term on/off</label>
            <input type="range" id="term" name="term" min="0" max="1" />
          </div>
          <div className="setting">
            <label htmlFor="diversification">Diversification on/off</label>
            <input type="range" id="diversification" name="setting5" min="0" max="1" />

          </div>
          <div>


            <button className="submit-button" onClick={handleClick}>Submit</button>
          </div>
        </div>

      )}

    </div>
  );
};