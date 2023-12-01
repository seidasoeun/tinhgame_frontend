import React, { useState } from 'react'

import "./css/setting_pass.css";
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Setting_pass() {

    const[User,setUser] = useState([]);

    const[newPass,setnewPass] = useState('');
    const[oldPass,setoldPass] = useState('');
    const[confirmPass,setconfirmPass] = useState('');

    // Submit Update Pass
    const fun_submitUpdatePass=()=>{
        if( oldPass !== "" && newPass !== "" && confirmPass !== ""){
            if(newPass == confirmPass){
                const Token = JSON.parse(localStorage.getItem("auth"));
                const data = {newPass,oldPass};
                axios.put('http://127.0.0.1:8000/api/changepass',data,{
                  headers:{
                      "Authorization" : "Bearer "+Token.token,
                  }
                }).then(()=>{
                    toast.success('Update Success ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setoldPass('');
                    setnewPass('');
                    setconfirmPass('');
                }).catch((error)=>{
                    toast.warn('Old Passworld is incorrect !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });                    
                })                
            }else if(newPass != confirmPass){
                toast.warn('New Password And Confirm Passworld is not match !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }else{
            // Submit Empty
        }
    }


  return (
    <main id='main'>
        <div className="containers">
            <p id="pass_p">Change Password</p>
            <hr size="4" color="black" />
            <p id="pass_p">Old Password :</p>
            <div className="form-floating mb-3">
                <input value={oldPass} onChange={e=>setoldPass(e.target.value)} type="password" className="form-control" id="floatingName" placeholder="name@example.com" />
            </div>
            <p id="pass_p">New Password :</p>
            <div className="form-floating mb-3">
                <input value={newPass} onChange={e=>setnewPass(e.target.value)} type="password" className="form-control" id="floatingName" placeholder="name@example.com" />
            </div>
            <p id="pass_p">Confirm Password :</p>
            <div className="form-floating mb-3">
                <input value={confirmPass} onChange={e=>setconfirmPass(e.target.value)} type="password" className="form-control" id="floatingName" placeholder="name@example.com" />
            </div>
            <center>
                <button onClick={fun_submitUpdatePass} id="pass_btn">Save</button>
            </center>
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

    </main>
  )
}

export default Setting_pass