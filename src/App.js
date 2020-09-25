import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import PlacesName from './Components/PlacesName/PlacesName';
import { Container } from 'react-bootstrap';
import Booking from './Components/Booking/Booking';
import Login from './Components/Login/Login';
import BookingSuccess from './Components/BookingSuccess/BookingSuccess';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const loggedInUser = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <loggedInUser.Provider value={[loggedUser, setLoggedUser]}>
      <div className="app">
        <Container >
          {/* <p className="text-white">Name: {loggedUser.name}</p> */}
          <HomePage></HomePage>
            <Router>
              <Switch>
                <Route exact path="/">
                  <PlacesName/>
                </Route>
                <Route path="/place/:link">
                  <Booking/>
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/booking-success/:linkSuccess">
                  <BookingSuccess />
                </PrivateRoute>
              </Switch>
            </Router>
        </Container>
      </div>
    </loggedInUser.Provider>
  );
}

export default App;
