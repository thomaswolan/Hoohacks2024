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

  const handleKeyDown = (event) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
      // Prevent the default action to avoid submitting the form (if any)
      event.preventDefault();
      // Navigate to the Results page and pass the search text as state
      navigate('/results', { state: { searchText } });
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
              placeholder="Find stock"
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
    const setting1 = document.getElementById('setting1').value;
    const setting2 = document.getElementById('setting2').value;
    const setting3 = document.getElementById('setting3').value;
    const setting4 = document.getElementById('setting4').value;
    const setting5 = document.getElementById('setting5').value;
  
    const response = await fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ setting1, setting2, setting3, setting4, setting5 })
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
        <FontAwesomeIcon icon={faCog} /> Settings
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div>
            <label htmlFor="setting1">Setting 1</label>
            <input type="range" id="setting1" name="setting1" min="0" max="5" />
          </div>
          <div>
            <label htmlFor="setting2">Setting 2</label>
            <input type="range" id="setting2" name="setting2" min="0" max="5" />
          </div>
          <div>
            <label htmlFor="setting3">Setting 3</label>
            <input type="range" id="setting3" name="setting3" min="0" max="5" />
          </div>
          <div>
            <label htmlFor="setting4">Setting 4</label>
            <input type="range" id="setting4" name="setting4" min="0" max="1" />
          </div>
            <div className="setting">
              <label htmlFor="setting5">Setting 5</label>
              <input type="range" id="setting5" name="setting5" min="0" max="1" />
              
              </div> 
              <div>
              

              <button className="submit-button" onClick={handleClick}>Submit</button>
        </div>
          </div>
      
      )}
    
    </div>
  );
};