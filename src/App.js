import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import AboutUs from './about_us'; // Assuming you have an AboutUs component
import { Footer } from "./components/Footer";
import React from 'react';


const AnimatedRoutes = () => {
  const location = useLocation();


  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/" element={<Banner />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <AnimatedRoutes /> {/* Use AnimatedRoutes component here */}
        <Footer />
      </div>
    </Router>
  );
}


export default App;


