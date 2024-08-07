import React from  'react'
import '../styles/Form.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { useNavigate } from  'react-router-dom';
import axios from  'axios'
import { useState } from  'react'
import {useAuth} from '../contexts/AuthContext'
import Grass from '../assets/grass.jpg'

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorState, setErrorState] = useState(false);
    const { login } = useAuth();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("You must have a username"),
        password: Yup.string().required("You must have a password"),
    });

    const onSubmit = async (data) => {
       setErrorState(false);

       try {
        await axios.post("https://world-cup-prep-tool-production.up.railway.app/users/login", data).then((response) => {

            if (!response.data.error){
                sessionStorage.setItem("accessToken", response.data);
                login(response.data)
                navigate('/teams');
            } else {
                setErrorState(true);
                setErrorMessage(response.data.error);
            }
        }) 
        } catch (error) {
            console.log(error);
        }
    }

  return <>
  
  <img src={Grass} width="100vw" height="100vh" style={{zIndex: '-1', position: 'absolute', 
    width: '100vw', height: '86.6vh', filter: 'brightness(90%)', opacity: "80%"}} />
  <div className="login-div">
    <h1>Login</h1>
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
          { errorState && <p style={{color:  'Firebrick'}}>{errorMessage}</p>}
          <p style = {{fontSize: "20px", marginTop: '2vh'}}><strong>Don't have an account?</strong> <a href="/register">Sign up</a></p>       
        </Form>
    </Formik>

  </div>
  
  
  </>
}

export default Login
