import React, { useEffect, useState } from 'react';
import './css/inbox_toadmin.css';
import axios from 'axios';

//Modal
import { Button, Modal } from 'react-bootstrap';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inbox_toadmin_card({item,fun_getAllInbox_toadmin}) {

    const[DataProduct,setDataProduct] = useState([]);

    const[typeInbox,settypeInbox] = useState('');
    const[typeImg,settypeImg] = useState('');

    // All product
    const[message,setmessage] = useState('');
    const[user_id,setuser_id] = useState(item.user_id);

    // date
    const[dateProduct,setdateProduct] = useState('');

    // Modal Inbox
    const[show2,setshow2]=useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    useEffect(()=>{
        fun_getDataProduct();
        fun_checkTypeInbox();
        fun_checkType();
        fun_getDateProduct(item.created_at);
    },[])

    // get data product By id
    const fun_getDataProduct=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getproductbyid/'+item.product_id,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataproduct)=>{
            setDataProduct(dataproduct.data);
            setmessage('Email : '+dataproduct.data.email+'  Email Password :  '+dataproduct.data.email_password+'  Username :  '+dataproduct.data.username+'  Password :  '+dataproduct.data.password);
        });
    }

    // check type
    const fun_checkTypeInbox=()=>{
        if(item.message == null){
            settypeInbox('Refund');
        }
    }

    const fun_checkType=()=>{
        if(item.type == 'Clash Of Clan'){
            settypeImg('../../../../img/coc.jpg');
        }else if(item.type == 'Growtopia'){
            settypeImg('../../../../img/gt.jpg');
        }else if(item.type == 'Mobile Legend'){
            settypeImg('../../../../img/mlbb.jpg');
        }
    }

    //Inbox
    const fun_inbox=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const data = {user_id,message};
        console.log(message);
        axios.post('http://127.0.0.1:8000/api/inbox',data,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/inbox_toadmin/'+item.product_id,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/product/'+item.product_id,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        }).then(()=>{
            toast.success('Inbox Refund Success', {
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
                fun_getAllInbox_toadmin();
                handleclose2();
            },1000);
        });
    } 
    
    // Delete
    const fun_delete=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.delete('http://127.0.0.1:8000/api/inbox_toadmin/'+item.product_id,{
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
                fun_getAllInbox_toadmin();
                handleclose2();
            },1000);
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
                    <img src={typeImg} />
                </div>
                <div id='box_body'>
                    <div id='up'>
                        <span id='box_text'>INBOX BY USER ID : {item.user_id}</span>
                        <span id='box_text'>PRODUCT ID : {item.product_id}</span>
                    </div>
                    <div id='down'>
                        <div id='co_box'>
                            <div id='rad'></div>
                        </div>
                        <span id='box_text2'>Type : {typeInbox}</span>
                    </div>
                </div>
                <div id='box_foot'>
                    <span id='box_text2'>{dateProduct}</span>
                </div>
            </div>
        </div>

            {/* Modal Inbox */}
            <Modal show={show2}>
              <Modal.Header>
                <Modal.Title>
                  <center>Refund to User ID : {item.user_id}</center>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea value={message}  id='textarea_modal' maxLength='100' placeholder='Enter Inbox to user....'></textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_delete}>Delete</Button>
                <Button onClick={fun_inbox}>Save</Button>
              </Modal.Footer>
            </Modal>

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
