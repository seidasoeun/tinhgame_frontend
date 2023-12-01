import React, { useState } from 'react';
import './css/feedback.css';
import axios from 'axios';

import Head from '../../Head.js';

// icon
import { VscFeedback } from 'react-icons/vsc';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// route
import { Link } from 'react-router-dom';
import { Routes , Route , useNavigate } from "react-router-dom";

export default function Feedback() {

    const[message,setmessage] = useState('');

    // Navigate
    const navigate = useNavigate();

    const fun_feedback=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const data = {message};
        axios.post('http://127.0.0.1:8000/api/feedback',data,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then(()=>{
            toast.success('Feedback Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {            
                navigate('/');
              }, 1000);
        })
    }

  return (
    <div>
        <Head/>
        <div id='feedback_body'>
            <div id='feedback_logo'>
                <p><VscFeedback size="45"/> Feedback </p>
            </div>
            <div id='feedback_box'>
                <div id='f_form'>
                    <textarea value={message} onChange={e => setmessage(e.target.value)} id='f_des' placeholder='comment your feedback here....'></textarea>
                </div>
                <div id='f_btn'>
                    <button onClick={fun_feedback} class="btn btn-outline-primary">Submit</button>
                </div>
            </div>
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
    </div>
  )
}
