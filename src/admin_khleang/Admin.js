import React, { useEffect, useState } from 'react';
import './css/admin.css';
import axios from 'axios';

// route
import { Link } from 'react-router-dom';
import { Routes , Route , useNavigate } from "react-router-dom";

// react-con
import {BiHomeAlt2} from 'react-icons/bi'
import {MdOutlineForwardToInbox} from 'react-icons/md'
import {HiOutlineInboxIn} from 'react-icons/hi'
import {FiRefreshCcw} from 'react-icons/fi'
import {MdOutlineFeedback} from 'react-icons/md'
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'

import Admin_home from './Admin_home';
import Admin_inbox from './Admin_inbox';
import Inbox_toadmin from './Inbox_toadmin';
import Admin_product from './Admin_product';
import Admin_BuyProduct from './Admin_BuyProduct';

export default function Admin() {

    const[lenInboxtoadmin,setlenInboxtoadmin] = useState([]);
    const[lenApprove,setlenApprove] = useState([]);
    const[lenBuyProduct,setlenBuyProduct] = useState([]);
    const[DataFeedback,setDataFeedback] = useState([]);

    //Direct to Home Admin
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('./Admin_home');
    }
    useEffect(()=>{
        Direct();
    },[]);

    // To Logout
    const DirectLogin=()=>{
        navigate('/');
    }
    // Logout
    const Logout=()=>{
        localStorage.clear();
        DirectLogin();
    }

    useEffect(()=>{
        fun_getAllInbox_toadmin();
        fun_getDataApprove();
        fun_getAllFeedback();
        fun_getAllBuyProduct();
    },[])

    // Len Inbox_inadmin
    const fun_getAllInbox_toadmin=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/allinbox_toadmin',{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((datainbox_toadmin)=>{
            setlenInboxtoadmin(datainbox_toadmin.data);
        })
    }

    // len Ask for Approve
    const fun_getDataApprove=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getallapprove',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataApprove)=>{
            setlenApprove(dataApprove.data);
        });
    }
    
    // len Feedback
    const fun_getAllFeedback=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/feedback',{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((datafeedback)=>{
            setDataFeedback(datafeedback.data);
        })
    }

    // get All buy product
    const fun_getAllBuyProduct=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/buyproduct',{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then((DataAllProduct)=>{
            setlenBuyProduct(DataAllProduct.data);
        })
    }


  return (
    <div id='admin_body'>
        <div id='admin_body_left'>
            <div id='left_box'><img onClick={DirectLogin} id='left_box_logo' src='../../../img/tg_logo4_nobg.png' /></div>
            <div id='left_box'><Link to='Admin_home' className='a_margin'><BiHomeAlt2 size="30" color='white'/></Link></div>
            <div id='left_box'><Link id='a_inbox' to='Admin_inbox'><MdOutlineForwardToInbox size="30" color='white'/>{lenApprove.length}</Link></div>
            <div id='left_box'><Link id='a_inbox' to='inbox_toadmin'><HiOutlineInboxIn size="35" color='white'/>{lenInboxtoadmin.length + DataFeedback.length}</Link></div>
            <div id='left_box'><Link id='a_inbox' to='Admin_buyproduct'><MdOutlineProductionQuantityLimits size="30" color='white'/>{lenBuyProduct.length}</Link></div>
            <div id='left_box'><Link id='a_inbox' className='a_margin' to='/refresh'><FiRefreshCcw size="30" color='white'/></Link></div>
            <div id='left_box_logout'>
                <button type="button" onClick={Logout} class="btn btn-outline-danger">Logout</button>
            </div>
        </div>
        <div id='admin_body_right'>
            <Routes>
                <Route path='Admin_home' element={<Admin_home/>}></Route>
                <Route path='User_product/:id' element={<Admin_product/>}></Route>
                <Route path='Admin_inbox' element={<Admin_inbox/>}></Route>
                <Route path='Admin_buyproduct' element={<Admin_BuyProduct/>}></Route>
                <Route path='inbox_toadmin' element={<Inbox_toadmin/>}></Route>
            </Routes>
        </div>
    </div>
  )
}
