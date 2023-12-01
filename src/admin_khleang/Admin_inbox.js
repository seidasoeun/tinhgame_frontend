import React, { useEffect, useState } from 'react';
import './css/admin_inbox.css';

import Inbox_card from './Inbox_card';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function Admin_inbox() {

    const[DataApprove,setDataApprove] = useState([]);

    useEffect(()=>{
        fun_getDataApprove();
    },[]);

    //delete filter UI  (no window reload)
    const deleteUI=(id)=>{
        setDataApprove(DataApprove.filter(DataApprove => DataApprove.id !== id));
    }

    // fun get All Approve
    const fun_getDataApprove=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getallapprove',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataApprove)=>{
            setDataApprove(dataApprove.data);
            console.log(dataApprove.data);
        });
    }


  return (
    <div id='inbox_body'>
        {
            DataApprove.map((item)=>{
                return <Inbox_card key={item.id} item={item} deleteUI={deleteUI} fun_getDataApprove={fun_getDataApprove}></Inbox_card>
            })
        }
    </div>
    
  )
}

