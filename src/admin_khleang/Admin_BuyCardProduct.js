import React, { useEffect, useState } from 'react';

//Modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin_BuyCardProduct({item,fun_getAllBuyProduct}) {  

    // Type & Date
    const[TypeProduct,setTypeProduct] = useState('');
    const[dateProduct,setdateProduct] = useState('');

    // Delete modal
    const[show2,setshow2]= useState();
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    useEffect(()=>{
        fun_checkType();
        fun_getDateProduct(item.created_at);
    },[]);

    // Check type
    const fun_checkType=()=>{
        if(item.type == "Clash Of Clan"){
            setTypeProduct('../../img/coc.jpg');
        }else if(item.type == "Growtopia"){
            setTypeProduct('../../img/gt.jpg');
        }else if(item.type == "Mobile Legend"){
            setTypeProduct('../../img/mlbb.jpg');
        }
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

  // Delete
  const fun_delete=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://127.0.0.1:8000/api/buyproduct/'+item.id,{
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
        fun_getAllBuyProduct();
        handleclose2();
      }, 1500);
    })
  }

  return (
    <div>
        <div onClick={handleshow2} id='inbox_b'>
            <div id='box'>
                <div id='pic'>
                    <img src={TypeProduct} />
                </div>
                <div id='box_body'>
                    <div id='up'>
                        <span id='box_text'>BUYER : {item.buyer}</span>
                        <span id='box_text'>USER_ID : {item.buyer_id}</span>
                        <span id='box_text'>PRODUCT_ID : {item.product_id}</span>
                        <span id='box_text'>VALUE : {item.value}</span>
                    </div>
                    <div id='down'>
                        <span id='box_text'>SELLER : {item.seller}</span>
                        <span id='box_text'>USER_ID : {item.seller_id}</span>
                        <span id='box_text'>PRODUCT_ID : {item.product_id}</span>
                        <span id='box_text'>VALUE : {item.value}</span>
                    </div>
                </div>
                <div id='box_foot'>
                    <span id='box_text2'>{dateProduct}</span>
                </div>
            </div>
        </div>

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

        {/* Modal Delete*/}
        <Modal show={show2}>
            <Modal.Header>
                <Modal.Title>
                  <center>Delelte Buyer Product : {item.product_id}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You Sure To Delete This Buyer Product
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_delete}>Delete</Button>
            </Modal.Footer>
        </Modal>

    </div>
  )
}
