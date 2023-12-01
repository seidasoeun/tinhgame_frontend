import React, { useEffect, useState } from 'react';
import './css/admin_feedback.css';

//Modal
import { Button, Modal } from 'react-bootstrap';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Admin_feedback_card({item,fun_getAllFeedback}) {

    const[userByID,setuserByID] = useState([]);

    // Date
    const[dateProduct,setdateProduct] = useState('');

    // Modal Inbox
    const[show2,setshow2]=useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    useEffect(()=>{
      fun_profileImg();
      fun_getDateProduct(item.created_at);
    },[])

    const fun_profileImg=()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.get('http://127.0.0.1:8000/api/getUser/'+item.user_id,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
      }).then((userdata)=>{
        setuserByID(userdata.data);
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

    const fun_deleteFeedback=()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.delete('http://127.0.0.1:8000/api/feedback/'+item.id,{
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
              fun_getAllFeedback();
              handleclose2();
          }, 1000);
      })
    }

  return (
    <div>
        <div onClick={handleshow2} id='inbox_b'>
            <div id='box'>
                <div id='pic'>
                    <img src={userByID.image}/>
                </div>
                <div id='box_body2'>
                    <div id='f_box1'>
                        <div id='box_by'>
                            <span id='box_text'>INBOX BY USER ID : {item.user_id}</span>
                        </div>
                        <div id='box_status'>
                            <div id='co_box'>
                                <div id='rad'></div>
                            </div>
                            <span id='box_text3'>Type : Feedback</span>
                        </div>
                    </div>
                    <div id='f_box2'>
                        <textarea id='f_textarea'>{item.message}</textarea>
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
                  <center>Inbox By User ID : {item.user_id}</center>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea value={item.message} id='textarea_modal' maxLength='100' placeholder='Enter Inbox to user....'></textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_deleteFeedback}>Delete</Button>
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
