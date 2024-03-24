import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo-apollo-new.png";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}