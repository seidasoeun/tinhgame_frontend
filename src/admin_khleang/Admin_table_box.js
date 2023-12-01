import React, { useEffect, useState } from 'react';
import './css/admin_home.css';
import { Link, redirect , useNavigate } from "react-router-dom";

//Modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin_table_box({item,deleteUI,fun_getDataUser,fun_getDataProduct}) {

  // inbox
  const[user_id,setuser_id] = useState(item.id);
  const[message,setmessage] = useState('');

  // Product User
  const[ProductUser,setProductUser] = useState([]);

  // Modal Delete
  const[show,setshow]=useState(false);
  const handleshow = () => setshow(true);
  const handleclose = () => setshow(false);
  // Modal Inbox
  const[show2,setshow2]=useState(false);
  const handleshow2 = () => setshow2(true);
  const handleclose2 = () => setshow2(false);

  // Date
  const[dateProduct,setdateProduct] = useState('');

  useEffect(()=>{
    fun_getProductUser();
    fun_getDateProduct(item.created_at);
  },[]);

  // get Product id for delete all
  const fun_getProductUser=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/product_user',{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then((dataproduct)=>{
      setProductUser(dataproduct.data);
    })    
  }

  const fun_deleteAll=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://127.0.0.1:8000/api/getUser/'+item.id,{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
      axios.delete('http://127.0.0.1:8000/api/product/'+item.id,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      }).then(()=>{
        axios.delete('http://127.0.0.1:8000/api/deletecommentbyproduct/'+ProductUser.id,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        })     
      }).then(()=>{
        axios.delete('http://127.0.0.1:8000/api/deletereplybyproduct/'+ProductUser.id,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        })     
      })
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
      deleteUI(item.id);
      fun_getDataUser();
      fun_getDataProduct();
      setTimeout(() => {
        handleclose();
      },1000);
    });
  }

  //Inbox
  const fun_inbox=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    const data = {user_id,message};
    axios.post('http://127.0.0.1:8000/api/inbox',data,{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
      toast.success('Inbox Message Success', {
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
        handleclose2();
        setmessage('');
      },1000);
    });
  } 

  // Close modal
  const fun_closemodal=()=>{
    handleclose2();
    setmessage('');
  }

  //Detail Admin product Param
  const navigate = useNavigate();
  const DirectDetail=()=>{
      navigate('/Admin/User_product/'+item.id);
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
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{dateProduct}</td>
            <td>
              <button onClick={handleshow} type="button" class="btn btn-outline-danger">Delete</button>
              <button onClick={handleshow2} type="button" class="btn btn-outline-success">Inbox</button>  
              <button onClick={DirectDetail} type="button" class="btn btn-outline-primary">Product</button>
            </td>

            {/* Modal Delete */}
            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  DELETE
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are Your Sure to Delete user and all user Product : {item.name}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={fun_deleteAll}>Delete</Button>
              </Modal.Footer>
            </Modal>

            {/* Modal Inbox */}
            <Modal show={show2}>
              <Modal.Header>
                <Modal.Title>
                  <center>Inbox to User : {item.name}</center>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea value={message} onChange={e => setmessage(e.target.value)} id='textarea_modal' maxLength='100' placeholder='Enter Inbox to user....'></textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={fun_closemodal}>Close</Button>
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
        </tr>

        
  )
}
