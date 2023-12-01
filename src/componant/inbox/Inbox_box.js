import React, { useEffect, useState } from 'react';
import './css/inbox.css';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inbox_box({item,getInboxByID}) {

    const[userDataInbox,setuserDataInbox] = useState([]);
    const[checkStatus,setcheckStatus] = useState('');

    // Date
    const[dateProduct,setdateProduct] = useState('');

    // Loading modal
    const[show2,setshow2]= useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    useEffect(()=>{
        fun_getDateProduct(item.created_at)
        fun_getDataThatInbox();
    },[])

    // get data user that inbox
    const fun_getDataThatInbox=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getdatainbox/'+item.inbox_by,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((userdatainbox)=>{
            setuserDataInbox(userdatainbox.data);
            console.log(userdatainbox.data);
            fun_checkStatus(userdatainbox.data.email);
        });
    }

    // check status
    const fun_checkStatus=(data)=>{
        if(data == 'admin@gmail.com'){
            setcheckStatus('Admin');
        }else{
            setcheckStatus('User');
        }
    }

    // Delete Inbox
    const fun_deleteInbox=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.delete('http://127.0.0.1:8000/api/inbox/'+item.id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            toast.success('Delete Success', {
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
                getInboxByID();
                handleclose2();
            }, 1000);
        }) 
    }

    // Convert to Date Product
    const fun_getDateProduct=()=>{
        let date = item.created_at;
        let temp = "";
        for (let index = 0; index < 10; index++) {
        temp = temp + date[index];
        }
        setdateProduct(temp)
    }

  return (
    <div>
        <div onClick={handleshow2} id='inbox_b'>
            <div id='box'>
                <div id='pic'>
                    <img src='../../../../img/g.jpg' />
                </div>
                <div id='box_body'>
                    <div id='up'>
                        <span id='box_text'>INBOX BY : {userDataInbox.name}</span>
                    </div>
                    <div id='down'>
                        <div id='co_box'>
                            <div id='rad'></div>
                        </div>
                        <span id='box_text2'>Status : {checkStatus}</span>
                    </div>
                </div>
                <div id='box_foot'>
                    <span id='box_text2'>{dateProduct}</span>
                </div>
            </div>
        </div>

        {/* Modal */}
        <Modal show={show2} /*key={item.id}*/>
            <Modal.Header>
                <Modal.Title>
                    <div id='m_head'>
                        <div id='m_head_box'>INBOX BY : {userDataInbox.name}</div>
                        <div id='m_head_box'>
                            <div id='co_box'>
                                <div id='rad' className='rad'></div>
                            </div>
                            <span>Status : {checkStatus}</span>
                        </div>
                    </div>
                    {/* <center>INBOX BY : {userDataInbox.name}</center>
                    Status : */}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea id='m_body'>{item.message}</textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_deleteInbox}>Delete</Button>
            </Modal.Footer>
        </Modal>
        
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
