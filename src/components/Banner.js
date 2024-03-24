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

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100 - Math.random() * 100);
  const [searchText, setSearchText] = useState(''); 

  const toRotate = useMemo(() => ["Web Developer", "Software Engineer", "Virginia Tech"], []);

  const tick = useCallback(() => {
  }, [loopNum, toRotate, isDeleting, text, setDelta, setIsDeleting, setLoopNum]);

  useEffect(() => {
  }, [tick, delta]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <h1>{`The Future of Investing.`}</h1>
          {/* Text input for "Find stock" */}
          <div className="search-bar"> {/* Add this line */}
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Find stock"
              className="modern-search mt-2"
            />
            <Button variant="outline-primary" type="submit">
    <FontAwesomeIcon icon={faArrowRight} /> {/* Use the arrow right icon */}
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faCog} /> Settings
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div>
            <label for="setting1">Setting 1</label>
            <input type="range" id="setting1" name="setting1" min="0" max="5" />
          </div>
          <div>
            <label for="setting2">Setting 2</label>
            <input type="range" id="setting2" name="setting2" min="0" max="5" />
          </div>
          <div>
            <label for="setting3">Setting 3</label>
            <input type="range" id="setting3" name="setting3" min="0" max="5" />
          </div>
        </div>
      )}
    </div>
  );
};