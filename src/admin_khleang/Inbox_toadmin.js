import React, { useEffect, useState } from 'react';
import './css/inbox_toadmin.css';
import { Link } from "react-router-dom";
import axios from 'axios';

// Componant
import Inbox_toadmin_card from './Inbox_toadmin_card';
import Admin_feedback_card from './Admin_feedback_card';

// react icon
import {BsArrowReturnLeft} from 'react-icons/bs'

export default function Inbox_toadmin() {

    const[DataInbox_toadmin,setDataInbox_toadmin] = useState([]);

    // feedback
    const[DataFeedback,setDataFeedback] = useState([]);

    useEffect(()=>{
        fun_getAllInbox_toadmin();
        fun_getAllFeedback();
    },[])

    // GET ALL INBOX_TOADMIN (REFUND)
    const fun_getAllInbox_toadmin=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/allinbox_toadmin',{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((datainbox_toadmin)=>{
            setDataInbox_toadmin(datainbox_toadmin.data);
        })
    }

    // get all feedback
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

  return (
    <div id='inbox_body3'>
        <div id='inbox_head'>
            {/* <div id='head_left'>
                <Link to='/'><BsArrowReturnLeft size='50'/></Link>
            </div> */}
            <div id='head_right'>
                <span id='span2'>INBOX & REFUND</span>
            </div>
        </div>

        {
            DataInbox_toadmin.map((item)=>{
                return <Inbox_toadmin_card item={item} key={item} fun_getAllInbox_toadmin={fun_getAllInbox_toadmin}/>       
            })
        }

        {
            DataFeedback.map((item)=>{
                return <Admin_feedback_card key={item.id} item={item} fun_getAllFeedback={fun_getAllFeedback} />
            })
        }

    </div>
  )
}
