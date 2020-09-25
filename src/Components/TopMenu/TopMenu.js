import React, { useContext } from 'react';
import { Button, Col, Form, FormControl, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import './TopMenu.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import Logo from './Logo.png';
import { loggedInUser } from '../../App';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdbreact';

const TopMenu = () => {
  const [loggedUser, setLoggedUser] = useContext(loggedInUser);
  const googleSignOut = () => {
      setLoggedUser({});
  }
  
    return (
        <div>
            <Row>
          <Col sm={2}>
            <Navbar.Brand href="#home"><img src={Logo} className="Header-logo" alt="logo" /></Navbar.Brand>
          </Col>
          <Col sm={10} >
          <Form inline className="justify-content-end">
              <FormControl style={{background:"transparent", width:"300px", color:"white"}} type="text" placeholder="Search Your Destination" className="mr-sm-2" />
              <Nav className="align-items-center" >
                <Nav.Link href="#" className="link-text">News</Nav.Link>
                <Nav.Link href="#" className="link-text">Destination</Nav.Link>
                <Nav.Link href="#" className="link-text">Blog</Nav.Link>
                <Nav.Link href="#" className="link-text">Contact</Nav.Link>
                
                
              {
                loggedUser.name ? <div>
                  {/* <Nav.Link href="#" className="link-text bg-warning text-dark" >Hi, {loggedUser.name}</Nav.Link>
                  <Nav.Link href="#" className="link-text">Log Out</Nav.Link> */}
                  <MDBDropdown>
                    <MDBDropdownToggle caret color="warning" className="text-dark">
                      Hi, {loggedUser.name}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={googleSignOut}>Log Out</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div> : 
                <Nav.Link href="/login" className="link-text"><Button variant="warning">Login</Button></Nav.Link>
              }
              </Nav>
          </Form>
            
          </Col>
        </Row>
        </div>
    );
};

export default TopMenu;