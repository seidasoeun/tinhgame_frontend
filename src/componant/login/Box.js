import React from 'react';
import { useEffect } from "react";
import './css/login.css';

import { Routes , Route , useNavigate } from "react-router-dom";

import Login from './Login';
import Register from './Register';

export default function Box() {
    //Redirt to Home use in Upload URL
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('./log');
    }
    useEffect(()=>{
        Direct();
    },[]);

  return (
    <div id="login_body">
        <div id='login_box'>
            <Routes>
                <Route path='log' element={<Login/>}></Route>
                <Route path='register' element={<Register/>}></Route>
            </Routes>
        </div>
    </div>
  )
}
