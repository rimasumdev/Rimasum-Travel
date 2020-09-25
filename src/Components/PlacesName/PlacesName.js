import React, { useState } from 'react';
import './PlacesName.css'
import {Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import places from '../../PlacesData';
import GoogleMap from '../GoogleMap/GoogleMap';

const PlacesName = () => {
      const [placeInfo,setPlaceInfo] = useState({
        name:"COX'S BAZAR",
        desc:"Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south. Aggameda Khyang monastery is home to bronze statues and centuries-old Buddhist manuscripts. South of town, the tropical rainforest of Himchari National Park has waterfalls and many birds. North, sea turtles breed on nearby Sonadia Island.",
      });
    
      const clickPlace = (name) => {
        const placeName = places.find(pn => pn.name === name);
        setPlaceInfo(placeName);
      }
    return (
        <div className="bg">
        <Row>
          <Col sm={4}>
            <h1>{placeInfo.name}</h1>
            <p>{placeInfo.desc}</p>
            <Button variant="warning">Booking</Button>
          </Col>
          <Col sm={8}>
            <Row>
                  <Col sm>
                    <Link to={`/place/${placeInfo.link}`} className="link-text">
                      <div className="img-card1" onMouseEnter={()=> clickPlace("COX'S BAZAR")}>
                        <h4>COX'S BAZAR</h4>
                      </div>
                    </Link>
                  </Col>
                  <Col sm>
                    <Link to={`/place/${placeInfo.link}`} className="link-text">
                      <div className="img-card2" onMouseEnter={()=> clickPlace("SREEMANGAL")}>
                        <h4>SREEMANGAL</h4>
                      </div>
                    </Link>
                  </Col>
                  <Col sm>
                    <Link to={`/place/${placeInfo.link}`} className="link-text">
                    <div className="img-card3" onMouseEnter={()=> clickPlace("SUNDARBAN")}>
                      <h4>SUNDARBAN</h4>
                    </div>
                    </Link>
                  </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
};

export default PlacesName;