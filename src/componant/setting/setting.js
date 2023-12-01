import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/setting.css";

import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Setting_profile from "./setting_profile";
import Setting_pass from "./setting_pass";

function Setting() {

    const navigate = useNavigate();
    const fun_logout=()=>{
        localStorage.clear();
        navigate('/');
    }

    const To_Profile=()=>{
        navigate('setting_profile');
    }
    const To_Password=()=>{
        navigate('setting_pass');
    }

    useEffect(()=>{
        navigate('setting_profile')
    },[])

  return (
    <div id='main_Setting'>
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div id="c1_text">
                        <a id="setting_back"><img src="../../img/arrow.png" /></a>
                        <p id="p">Account</p>
                    </div>
                    <div id="c1" onClick={To_Profile}>
                        <Link className="link_edit">Edit Profile</Link>
                    </div>
                    <div id="c1" onClick={To_Password}>
                        <Link className="link_pass">Change Password</Link>
                    </div>
                    <center>
                        <button id="button" onClick={fun_logout}>Log Out</button>
                    </center>
                </div>
                <div className="col">
                    <Routes>
                        <Route path='setting_profile' element={<Setting_profile />}></Route>
                        <Route path='setting_pass' element={<Setting_pass />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script> */}
    </div>
  )
}

export default Setting