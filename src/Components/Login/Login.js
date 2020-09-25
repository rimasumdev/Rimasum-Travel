import React, { useContext, useState } from 'react';
import {Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { loggedInUser } from '../../App';

const Login = () => {
    const [loggedUser, setLoggedUser] = useContext(loggedInUser);
    const [user,setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false,
        passMatch: false
    });
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig); 
    }
    const googleprovider = new firebase.auth.GoogleAuthProvider();
    const fbprovider = new firebase.auth.FacebookAuthProvider();

    const fbSignIn = () => {
        firebase.auth().signInWithPopup(fbprovider).then(function(result) {
            var user = result.user;
            console.log("UserInfo",user);
            const {displayName} = result.user;
            const signedInUser = {name:displayName};
            setLoggedUser(signedInUser);
            history.replace(from);

          }).catch(function(error) {
            var errorCode = error.code;
            console.log("ErrorCode", errorCode);
            var errorMessage = error.message;
            console.log("ErrorMsg",errorMessage);
            var email = error.email;
            console.log("ErrorEmail",email);
            var credential = error.credential;
            console.log("ErrorCre",credential);
            // ...
          });
    }

    const googleSignIn = () => {
        firebase.auth().signInWithPopup(googleprovider).then(function(result) {
            var user = result.user;
            const {displayName, email} = result.user;
            const signedInUser = {name:displayName, email};
            // console.log(signedInUser);
            setLoggedUser(signedInUser);

            history.replace(from);

          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
    }

    const formToggle = () => {
        const newAccount = true;
    }

    const emailPassValidator = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            // const mailValied = /\S+@\S+.\S/.test(e.target.value);
            isFieldValid = /\S+@\S+.\S/.test(e.target.value);
            // console.log("Email", mailValied);
        }
        if(e.target.name === 'password'){
            const passwordLenValied = e.target.value.length > 6;
            const passwordNumValied = /\d{1}/.test(e.target.value);
            isFieldValid = passwordLenValied && passwordNumValied;
            // console.log("PassLen", passwordLenValied);
            // console.log("PassNum", passwordNumValied);
        }
        if(e.target.name === 'confirmPassword'){
            const confirmLenValied = e.target.value.length > 6;
            const confirmNumValied = /\d{1}/.test(e.target.value);
            isFieldValid = confirmLenValied && confirmNumValied;
            // console.log("ConfirmPassLen", confirmLenValied);
            // console.log("ConfirmPassNum", confirmNumValied);
        }
        if(isFieldValid){
            console.log("Form Valid", isFieldValid);
            const formData = {...user}
            formData[e.target.name]= e.target.value;
            setUser(formData);
        }
        else{
            setUser({
                fname: '',
                lname: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: '',
                success: false
            });
        }
        // console.log(user);
    }


    const createAccount = (e) => {
        // console.log(user);
        if(user.password !== user.confirmPassword){
            const passNotMatch = {...user}
            passNotMatch.passMatch= true;
            setUser(passNotMatch);
        }
        else {
            if(user.fname && user.lname && user.email && user.password){
                console.log("Submitted");
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then (res => {
                    console.log(res);
                    const userData = {...user}
                    userData.error= '';
                    userData.success= true;
                    userData.passMatch= false;
                    setUser(userData);
                    updateUserInfo(user.fname +" "+ user.lname);
                    console.log(user);
                })
                .catch(error => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const errorData = {...user}
                    errorData.error= errorMessage;
                    errorData.success= false;
                    setUser(errorData);
                  });  
            }
        }
        
        
        e.preventDefault();
        e.target.reset();
    }

    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        }).then(function() {
            // console.log("User Name Update Successfully");
        }).catch(function(error) {
        // An error happened.
        });
    }
    const loginForm = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            console.log(res.user);
            const {displayName, email} = res.user;
            console.log(displayName, email);
            const signedInUser = {name:displayName, email};
            // console.log(signedInUser);
            setLoggedUser(signedInUser);
            history.replace(from);
        })
        .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
          console.log(user);
          e.preventDefault();
    }

    const [newAccount,setNewAccount] = useState(true);
    return (
        <div className=" d-flex justify-content-center">
            <div className="bg-login">
                <Row>
                    <Col sm={12} className="bg-white text-dark p-3 rounded">
                        <p className="text-center text-danger">{user.passMatch ? "Password Doesn't match" : " "}</p>
                        <p className="text-center text-danger">{user.error}</p>
                            {
                                newAccount ?
                        <form onSubmit={createAccount}> 
                            <div>
                                <h3 className={`mb-3 ${user.success ? 'text-success' : 'text-dark'}`}>{user.success ? 'Account Created Successfully':'Create an Account'}</h3>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="text" name="fname" onBlur={emailPassValidator} placeholder="First Name" required/>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="text" name="lname" onBlur={emailPassValidator} placeholder="Last Name" required/>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="email" name="email" onBlur={emailPassValidator} placeholder="Email" required/>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="password" name="password" onBlur={emailPassValidator} placeholder="Password" required/>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="password" name="confirmPassword" onBlur={emailPassValidator} placeholder="Confirm Password" required/>
                                    </Form.Group>
                                </div>
                                <div className="text-center mb-2">
                                    {/* <Form.Group>
                                        <Button className="btn btn-block text-dark" variant="warning" type="submit">Create an Account</Button>
                                    </Form.Group> */}
                                    <Button className="btn btn-block text-dark" variant="warning" type="submit">Create an Account</Button>
                                </div>
                            </div>
                        </form>

                            :

                            <form onSubmit={loginForm}>
                                <div>
                                <h3 className="mb-3">Login</h3>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="email" name="email" onBlur={emailPassValidator} placeholder="Email" required/>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group>
                                        <Form.Control type="password" name="password" onBlur={emailPassValidator} placeholder="Password" required/>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Row>
                                        <Col sm ={6}>
                                            <Form.Group>
                                                <Form.Check type="checkbox" label="Remember Me" />
                                            </Form.Group>
                                        </Col>
                                        <Col sm ={6} className="text-right">
                                            <a href="#">Forgot Password</a>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="text-center mb-2">
                                    <Button className="btn btn-block text-dark" variant="warning" type="submit">Login</Button>
                                </div>
                                </div>
                            </form>
                            }
                            
                            <div className="text-center">
                               <p>{newAccount ? "Already have an account?" : "Don't Have an Account?"}
                                    <a href="#" onClick={() => setNewAccount(!newAccount)}>
                                        {newAccount ? ' Login' : ' Create an Account'}
                                    </a>
                                </p>
                            </div>

                            <div className="text-center">
                                <Row>
                                    <Col><div><hr/></div></Col>
                                    <p>Or Continue With</p>
                                    <Col><div><hr/></div></Col>
                                </Row>
                            </div>
                            <div className="text-center">
                                <Row>
                                    <Col sm ={6}>
                                    <Button className="btn btn-sm btn-block text-white" variant="dark" onClick={fbSignIn}>Facebook</Button>
                                    </Col>
                                    <Col sm ={6}>
                                    <Button className="btn btn-sm btn-block text-white" variant="dark" onClick={googleSignIn}>Google</Button>
                                    </Col>
                                </Row>
                            </div>
                        
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Login;