import React from 'react';
import {Container} from 'react-bootstrap';
import './HomePage.css';
import TopMenu from '../TopMenu/TopMenu';

const HomePage = () => {
    return (
    // <div className="app-container">
      <Container className="top-menu">
        <TopMenu />
      </Container>
    // </div>
    );
};

export default HomePage;