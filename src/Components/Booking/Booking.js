import React, { useState } from 'react';
import './Booking.css'
import {Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import places from '../../PlacesData';

const Booking = () => {
      const {link} = useParams();
      const placeName = places.find(pn => pn.link === link);
      const [placeInfo,setPlaceInfo] = useState(placeName);

    return (
        <div className="bg">
        <Row>
          <Col sm={8}>
            <h1>{placeInfo.name}</h1>
            <p>{placeInfo.desc}</p>
          </Col>
          <Col sm={4} className="bg-white text-dark p-3 rounded">
                <form>
                  <div>
                  <Form.Group>
                    <Form.Label>Origin</Form.Label>
                    <Form.Control type="text"/>
                  </Form.Group>
                  </div>
                  <div>
                  <Form.Group>
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" value={placeInfo.name}/>
                  </Form.Group>
                  </div>
                  <div>
                    <Row>
                      <Col sm ={6}>
                        <Form.Group>
                          <Form.Label>From</Form.Label>
                          <Form.Control type="date"/>
                        </Form.Group>
                      </Col>
                      <Col sm ={6}>
                        <Form.Group>
                          <Form.Label>To</Form.Label>
                          <Form.Control type="date"/>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                  </div>
                  <div className="text-center">
                    <Button className="btn btn-block text-dark" variant="warning"><Link to={`/booking-success/${placeInfo.link}`} className="btn-link-text">Start Booking</Link></Button>
                  </div>
                </form>
          </Col>
        </Row>
      </div>
    );
};

export default Booking;