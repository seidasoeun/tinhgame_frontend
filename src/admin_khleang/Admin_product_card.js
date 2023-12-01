import React, { useEffect, useState } from 'react';
import './css/admin_product.css';
import { Link, redirect , useNavigate } from "react-router-dom";

//Modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin_product_card({item,fun_product}) {

    const[product_id,setproduct_id] = useState(item.id);
    const[user_id,setuser_id] = useState(item.user_id);
    const[value,setvalue] = useState(item.value);

    const[img_type,setimg_type] = useState("");

    // navigate
    const navigate = useNavigate();
    const DirectProduct=()=>{
        navigate('/content/'+item.id);
    }

    // Modal Sold
    const[show,setshow]=useState(false);
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);

    // Delete modal
    const[show2,setshow2]= useState();
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    useEffect(()=>{
        fun_checkType();
    },[])

    // check Type approve for img
    const fun_checkType=()=>{
        if(item.type == 'Clash Of Clan'){
        setimg_type("../../img/coc.jpg");
        }else if(item.type == 'Growtopia'){
        setimg_type("../../img/gt.jpg");
        }else if(item.type == 'Mobile Legend'){
        setimg_type("../../img/mlbb.jpg");
        }
    }

    // SOLD
    const fun_sold=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const data = {product_id,user_id,value};
        axios.post('http://127.0.0.1:8000/api/sold',data,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/product/'+item.id,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        }).then(()=>{
            toast.success('Sold Success', {
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
                fun_product();
                handleclose();
            },1000);
        })
    }

  // Delete
  const fun_delete=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://127.0.0.1:8000/api/product/'+item.id,{
      headers:{
          "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
        axios.delete('http://127.0.0.1:8000/api/deletecommentbyproduct/'+item.id,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/deletereplybyproduct/'+item.id,{
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
      setTimeout(() => {            
        fun_product();
        handleclose();
      }, 1000);
    })
  }

  return (
    <div>
        <div className="card" id='card'>
            <div id='card-head2'>
                <img src={img_type}  />
            </div>
            <div className="card-body">
                <div id='tt'>PRODUCT ID : {item.id}</div>
                <div id='title_card'>
                    <div className="card-title">Title : {item.title}</div>
                    <div className="card-title2">Value : {item.value}</div>
                </div>
                <div className="card-text">
                    Description : {item.description}
                </div>
                <button onClick={DirectProduct} className="btn btn-outline-primary">Check</button>
                <button onClick={handleshow2} className="btn btn-outline-danger">Delete</button>
                <button onClick={handleshow} class="btn btn-outline-secondary">Sold</button>
            </div>
        </div>

        {/* Modal Sold */}
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>
                    SOLD PRODUCT {item.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are Your Sure that this Product is Sold ?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={fun_sold}>Save</Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Delete*/}
        <Modal show={show2}>
            <Modal.Header>
                <Modal.Title>
                  <center>Delelte Product : {item.id}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You Sure To Delete This Product
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_delete}>Delete</Button>
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
