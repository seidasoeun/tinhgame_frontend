import React, { useEffect, useState } from 'react';
import './css/postBtn.css';
import { Routes , Route , useNavigate } from "react-router-dom";

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card_user({item,fun_getProductUser}) {

  const[title,settitle] = useState(item.title);
  const[description,setdescription] = useState(item.description);
  const[value,setvalue] = useState(item.value);

  // refund
  const[user_id,setuser_id] = useState(item.user_id);
  const[product_id,setproduct_id] = useState(item.id);
  const[type,settype] = useState(item.type);

  const[img_type,setimg_type] = useState("");

  const navigate = useNavigate();

  // modal Delete
  const[show,setshow]= useState();
  const handleshow = () => setshow(true);
  const handleclose = () => setshow(false);

  // updage modal
  const[show2,setshow2]= useState();
  const handleshow2 = () => setshow2(true);
  const handleclose2 = () => setshow2(false);

  // Refund modal
  const[show3,setshow3]= useState();
  const handleshow3 = () => setshow3(true);
  const handleclose3 = () => setshow3(false);

  useEffect(()=>{
    fun_checkType();
  },[])

  // check Type approve for img
  const fun_checkType=()=>{
    if(item.type == 'Clash Of Clan'){
      setimg_type("../img/coc.jpg");
    }else if(item.type == 'Growtopia'){
      setimg_type("../img/gt.jpg");
    }else if(item.type == 'Mobile Legend'){
      setimg_type("../img/mlbb.jpg");
    }
  }

  // Delete
  const fun_delete=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://127.0.0.1:8000/api/product/'+item.id,{
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
        fun_getProductUser();
        handleclose();
      }, 1000);
    })
  }

  // Update
  const fun_update=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    const data = {title,description,value};
    axios.put('http://127.0.0.1:8000/api/product/'+item.id,data,{
      headers:{
          "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
      toast.success('Update Success', {
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
        fun_getProductUser();
        handleclose2();
      }, 1000);
    })
  }

// Refund
  const fun_refund=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    const data = {user_id,product_id,type};
    axios.post('http://127.0.0.1:8000/api/inbox_toadmin',data,{
      headers:{
          "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
      toast.success('Refund Success Please wait for Admin Inbox', {
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
        handleclose3();
      }, 1000);
    })
  }

  // Check
  const Check=()=>{
    navigate('/content/'+item.id);
  }

  return (
    <div>
        <div className="card">
            <div id='card-head'>
                <img src={img_type} />
            </div>
            <div className="card-body">
                <div id='title_card'>
                  <div className="card-title">Title : {item.title}</div>
                  <div className="card-title2">Value : {item.value}</div>
                </div>
                <div className="card-text">Description : {item.description}</div>
                <button onClick={Check} id='b_btn' className="btn btn-outline-primary">Check</button>
                <button onClick={handleshow2} id='mid_btn' className="btn btn-outline-warning">Update</button>
                <button onClick={handleshow} id='b_btn' className="btn btn-outline-danger">Delete</button>
                <button onClick={handleshow3} id='b_btn' class="btn btn-outline-secondary">Refund</button>
            </div>


        </div>

        {/* Modal Delete*/}
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>
                  <center>Product : {item.title}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You Sure To Delete This Product
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={fun_delete}>Delete</Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Update */}
        <Modal show={show2} >
            <Modal.Header>
                <Modal.Title>
                  <center>Update Product :</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id='update_modal'>
                    <p className='p'>Title :</p>
                    <input value={title} onChange={e => settitle(e.target.value)}  id='ip' type='text' />

                    <p className='p'>Description :</p>
                    <textarea value={description} onChange={e => setdescription(e.target.value)} id='card_textarea' ></textarea>

                    <p className='p'>Value :</p>
                    <input value={value} onChange={e => setvalue(e.target.value)} id='ip' type='text' />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_update}>Save</Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Refund*/}
        <Modal show={show3}>
            <Modal.Header>
                <Modal.Title>
                  <center>Refund Product : {item.title}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You Sure To Refund This Product
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose3}>Close</Button>
                <Button onClick={fun_refund}>Yes</Button>
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
