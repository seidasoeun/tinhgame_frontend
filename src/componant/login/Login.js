import React, { useState } from 'react';
import './css/login.css';
import PrivateRoutes from '../../PrivateRoutes';

import { useNavigate } from "react-router-dom";
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// modal
import { Button, Modal } from 'react-bootstrap';
//spinners
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Login() {

  //Redirt to Home use in Upload URL
  const navigate = useNavigate();
  const Direct=()=>{
    navigate('/login/register');
  }
  const HomeDirect=()=>{
    navigate('/');
  }
  const register=()=>{
    Direct();
  }
  const admin=()=>{
    navigate('/Admin');
  }

  // Login
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [Token,setToken] = useState("");

  const Login=async()=>{
    if( email =="" && password ==""){
      toast.warn('Please Insert all form...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else{
      handleshow2();
      const data = {email,password};
      const res = await axios.post("http://127.0.0.1:8000/api/login",data);
      if(res.status == 200){
        if(res.data == ""){
          toast.warn('Incorrect account...!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          handleclose2();
        }else{
          if(res.data.admin == "admin"){
            localStorage.setItem("auth",JSON.stringify(res.data));
            localStorage.setItem("len_pass",password.length); // jab pass for len
            localStorage.setItem("admin",JSON.stringify(res.data));
            handleclose2();
            admin();
          }
          else{
            console.log(res.data);
            localStorage.setItem("auth",JSON.stringify(res.data));
            localStorage.setItem("len_pass",password.length); // jab pass for len
            handleclose2();
            HomeDirect();
          }
        }
      }
    }
  }

  // Loading modal
  const[show2,setshow2]=useState(false);
  const handleshow2 = () => setshow2(true);
  const handleclose2 = () => setshow2(false);
  // spinner
  const [isloading,setisloading] = useState(false);
  //CSS spiner
  const override = {
    float: "left",
    margin: "5px",
    width: "100px",
    height: "50px",
  };

  
  return (
      <div id='login_main'>
        <div id='login_title'><center><b>Login</b></center></div>
        <div id='login_form'>
          <form>
            <div class="mb-2">
              <label for="Input1" class="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="Input1" placeholder="Email address" />
            </div>
            <div class="mb-3">
              <label for="Input2" class="form-label">password</label>
              <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} class="form-control" id="Input2" placeholder="Password" />
            </div>
            <div id='login_body_btn'>
              <button type="button" onClick={Login} class="btn btn-light" id='login_btn'>LOGIN</button>
            </div>
            <div id='login_backtohome'>
              <span onClick={HomeDirect}>Back to Homepage</span>
            </div>
            {/* toastify */}
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
            />
          </form>
        </div>
        <div id='login_foot'>
          <p>Don't have an Account ?</p>
          <a onClick={register}>Register</a>
        </div>

        {/* Loading Modal */}
        <Modal show={show2}>
          <Modal.Body>
            <span id='modal_text'>Loading Please Wait!</span><PacmanLoader color={'#360bf7'} cssOverride={override} loading={true} size={20} aria-label="Loading Spinner" data-testid="loader"/>
          </Modal.Body>
        </Modal>
      </div>
  )
}
