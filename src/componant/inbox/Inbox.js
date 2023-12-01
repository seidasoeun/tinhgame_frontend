import React, { useEffect, useState } from 'react';
import './css/inbox.css';
import { Link } from "react-router-dom";

import Inbox_box from './Inbox_box';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// react icon
import {BsArrowReturnLeft} from 'react-icons/bs'

export default function Inbox() {

    const[DataInbox,setDataInbox] = useState([]);

    useEffect(()=>{
        getInboxByID();
    },[])

    const getInboxByID=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/inbox',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataInbox)=>{
            setDataInbox(dataInbox.data);
        })
    }

  return (
    <div>

        <div id='inbox_body2'>
            <div id='inbox_head'>
                <div id='head_left'>
                    <Link to='/'><BsArrowReturnLeft size='50'/></Link>
                </div>
                <div id='head_right'>
                    <span id='span'>INBOX</span>
                </div>
            </div>

            {
                DataInbox.map((item)=>{
                    return <Inbox_box item={item} key={item} getInboxByID={getInboxByID}/>       
                })
            }

        </div>
    </div>
  )
}
