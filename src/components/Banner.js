import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/new-header.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

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
          <Col xs={12} md={8} xl={6}>
            <h1>{`The Future of Investing.`}</h1>
            {/* Text input for "Find stock" */}
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Find stock"
              className="modern-search mt-2"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
