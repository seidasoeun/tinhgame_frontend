import React, { useEffect, useState } from 'react';
import './css/app.css';

// Logo Tinhgame
import Logo from './imgs/tg_logo4.jpg';

// Navigate , route
import { Routes , Route , useNavigate } from "react-router-dom";

// react icon
import { Link } from "react-router-dom";
import {BiHomeAlt2} from 'react-icons/bi';
import {RiCustomerService2Line} from 'react-icons/ri';
import {CgProfile} from 'react-icons/cg';
import {MdForwardToInbox} from 'react-icons/md';
import axios from 'axios';

export default function Head() {

  const[lenInbox,setlenInbox] = useState([]);
  const[a,seta] = useState(false);

  //Direct to Home Admin
  const DirectToAdmin=()=>{
    if(!localStorage.getItem('admin')){

    }else{
      navigate('/Admin');
    }
  }

  // Select Type
  const[selectType,setselectType] = useState('');

  useEffect(()=>{
    if(localStorage.getItem("auth")){
      fun_getLenInbox();
    }
  },[])

  // Lenght Inbox
  const fun_getLenInbox=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    seta(true);
    axios.get('http://127.0.0.1:8000/api/inbox',{
        headers:{
            "Authorization" : "Bearer "+Token.token,
        }
    }).then((dataInbox)=>{
      setlenInbox(dataInbox.data);
    })
  }

  // Submit Select Type

    //Direct to Home Admin
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('/');
    }

  const fun_submitSelectType=(e)=>{
    e.preventDefault();
    if(selectType == 'Clash Of Clan'){
      localStorage.setItem('coc',1);
      Direct();
    }else if(selectType == 'Growtopia'){
      localStorage.setItem('gt',1);
      Direct();
    }else if(selectType == 'Mobile Legend'){
      localStorage.setItem('mlbb',1);
      Direct();
    }else if(selectType == ''){
        // Nothing
    }
  } 



  return (
    <div>
        <div className="p_head">
          <div className="logo">
            <img onClick={DirectToAdmin} src={Logo} />
          </div>

          <div className="search">
            <form action="" className="list">
              <select id='select' value={selectType} onChange={e=>setselectType(e.target.value)} className="dropdown">
                <option selected value="" >All Type</option>
                <option value="Clash Of Clan">Clash Of Clan</option>
                <option value="Growtopia">Growtopia</option>
                <option value="Mobile Legend">Mobile Legend</option>
              </select>
              <input id='search' onClick={e=>fun_submitSelectType(e)} type="submit" className="head_btn" value="Search" />
            </form>
          </div>

          <div className="icon">
            <Link to={"/"} className="global"><BiHomeAlt2 size={35}/></Link>
            <Link to={"/feedback"} id='icon_mid' href="" className="heart"><RiCustomerService2Line size={35} /></Link>
            <Link to={"/Profile"} className="profile"><CgProfile size={35}/></Link>
            <Link to={"/Inbox"} className="inbox"><MdForwardToInbox size={35}/><span id='inbox_len'>{a?lenInbox.length:<div></div>}</span></Link>
          </div>
          <div className="post">
            <Link to={"/post"}>           {/*  ./post  =  /homepage/post  tor router jas*/}
                <button >Post</button>
            </Link>
          </div>
        </div>
    </div>
  )
}
