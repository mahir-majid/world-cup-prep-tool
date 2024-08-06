import React from 'react'
import '../styles/Form.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from  'axios';
import { useState } from 'react';
import Grass from '../assets/grass.jpg'

function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(false);

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(5, "Username needs to be at least 5 characters").max(15, "Username needs to be less than 15 characters").required("You must have a username"),
        password: Yup.string().min(5, "Password needs to be at least 5 characters").max(15, "Password needs to be less than 15 characters").required("You must have a password"),
    });

    const onSubmit = async (data) => {
       setErrorState(false);

       try {
        await axios.post("https://world-cup-prep-tool-production.up.railway.app/users/register", data).then((response) => {
            if (!response.data.error){
                navigate('/login');
            } else {
                setErrorState(true);
                setErrorMessage(response.data.error);
            }
        })

       } catch (error){
        console.log( 'Error');
       }
    }

  return <>
   <img src={Grass} width="100vw" height="100vh" style={{zIndex: '-1', position: 'absolute', 
    width: '100vw', height: '86.6vh', filter: 'brightness(90%)', opacity: "80%"}} />
  <div className="register-div">
    <h1>Register</h1>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Field id="inputUsername" name="username" placeholder="Username" 
          style={{marginTop: '1vh', width: '14vw', height: '4vh', paddingLeft: '0.5vw',
              borderRadius: '2px', fontFamily: 'Josefin Sans, sans-serif'
          }}/>
          <br></br>
          <br></br>
          
          <Field id="inputPassword" name="password" placeholder="Password" type="password"
          style={{marginTop: '1vh', width: '14vw', height: '4vh', paddingLeft: '0.5vw',
              borderRadius: '2px', fontFamily: 'Josefin Sans, sans-serif'
          }}/>

          <br></br>
          <br></br>

          <button className = "submit-button" type="submit"> <strong>Submit</strong> </button>
          <ErrorMessage name="username" component="div" style={{ color: 'firebrick', marginTop: '2vh', fontSize: '20px' }} />
          <ErrorMessage name="password" component="div" style={{ color: 'firebrick', marginTop: '1vh', fontSize: '20px' }} />
          { errorState && <p style={{color: 'firebrick'}}>{errorMessage}</p>}
          <p style = {{fontSize: "20px", marginTop: '2vh'}}> <strong>Already have an account?</strong> <a href="/login">Log in</a></p>       
        </Form>
    </Formik>
    

  </div>


  </>
}

export default Register
