import React, { useEffect, useState } from 'react';
import './css/admin_home.css';
import axios from 'axios';

import Admin_table_box from './Admin_table_box';


export default function Admin_home() {

    const[DataUser,setDataUser] = useState([]);
    const[DataProduct,setDataProduct] = useState([]);
    const[DataApprove,setDataApprove] = useState([]);

    useEffect(()=>{
        fun_getDataUser();
        fun_getDataProduct();
        fun_getDataApprove();
    },[])

    // fun get All User
    const fun_getDataUser=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getalluser',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataUser)=>{
            setDataUser(dataUser.data);
        });
    }

    // fun get All Product
    const fun_getDataProduct=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getallproduct',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataNote)=>{
            setDataProduct(dataNote.data);
        });
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


    //delete filter UI  (no window reload)
    const deleteUI=(id)=>{
        setDataUser(DataUser.filter(DataUser => DataUser.id !== id));
    }

  return (
    <div id='admin_home_body'>
        <div id='head'>
            <h3>Administration</h3>
        </div>
        <div id='body'>
            <div id='body_box1'>
                <div id='total'><h2>Total</h2></div>
                <div id='total_value'>
                    <div id='total_box'>
                        <p id='value' className='color1'>{DataUser.length}</p>
                        <p id='type' className='color1'>USER</p>
                    </div>
                    <div id='total_box' className='color2'>
                        <p id='value'>{DataProduct.length}</p>
                        <p id='type' className='color2'>PRODUCT</p>
                    </div>
                    <div id='total_box' className='color3'>
                        <p id='value'>{DataApprove.length}</p>
                        <p id='type' className='color3'>FOR APPROVE</p>
                    </div>
                </div>
            </div>

            <div id='body_box2'>
                <table id='table'  width="100%">
                    <tr id='t_head'>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Created</th>
                        <th>Function</th>
                    </tr>

                    {
                        DataUser.map((item)=>{
                            return <Admin_table_box key={item.id} item={item} deleteUI={deleteUI} fun_getDataProduct={fun_getDataProduct} fun_getDataUser={fun_getDataUser}/>
                        })
                    }

                </table>
            </div>
        </div>
    </div>
  )
}
