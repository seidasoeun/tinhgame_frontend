import React, { useEffect, useState } from 'react';
import './css/admin_inbox.css';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inbox_card({item,deleteUI,fun_getDataApprove}) {

    const[user_id,setuser_id] = useState(item.user_id);
    const[title,settitle] = useState(item.title);
    const[description,setdescription] = useState(item.description);
    const[type,settype] = useState(item.type);
    const[value,setvalue] = useState(item.value);
    const[email,setemail] = useState(item.email);
    const[email_password,setemail_password] = useState(item.email_password);
    const[username,setusername] = useState(item.username);
    const[password,setpassword] = useState(item.password);

    // photo approve
    const[photoApp,setphotoApp] = useState([]);
    // const[product_id,setproduct_id] = useState(item.id);

    const[img_type,setimg_type] = useState("");

    // date
    const[dateProduct,setdateProduct] = useState('');

    // modal Delete
    const[show,setshow]= useState();
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);

    // updage modal
    const[show2,setshow2]= useState();
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    // updage modal
    const[show3,setshow3]= useState();
    const handleshow3 = () => setshow3(true);
    const handleclose3 = () => setshow3(false);

    useEffect(()=>{
        fun_checkType();
        fun_getPhotoApp();
        fun_getDateProduct(item.created_at);
    },[]);

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

    // get photo Approve
    const fun_getPhotoApp=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getPhotoappByID/'+item.user_id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataPhoto)=>{
            setphotoApp(dataPhoto.data);
            console.log(dataPhoto.data);
        })
    }

    // delete & update & approve
    const fun_delete=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.delete('http://127.0.0.1:8000/api/approved/'+item.id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/approved_photo/'+item.user_id,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }  
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
                deleteUI(item.id);
                fun_getDataApprove();
                handleclose();
            }, 1000);
        });
    }

    const fun_update=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const data = {email,email_password,username,password};
        axios.put('http://127.0.0.1:8000/api/approved/'+item.id,data,{
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
                // deleteUI(item.id);
                fun_getDataApprove();
                handleclose2();
            }, 1000);
        })
    }

    const fun_approve=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const data = {user_id,title,description,type,value,email,email_password,username,password};
        axios.post('http://127.0.0.1:8000/api/apptopro',data,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataApprove)=>{
            photoApp.map((items)=>{
                const image = items.image;
                const product_id = dataApprove.data.id;
                const datas = {user_id,product_id,image}
                axios.post('http://127.0.0.1:8000/api/appPhotopro',datas,{
                    headers:{
                        "Authorization" : "Bearer "+Token.token,
                    }
                });
            })
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/approved/'+item.id,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            }).then(()=>{
                axios.delete('http://127.0.0.1:8000/api/approved_photo/'+item.user_id,{
                    headers:{
                        "Authorization" : "Bearer "+Token.token,
                    }
                })
            })
        }).then(()=>{
            toast.success('Approve Success', {
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
                fun_getDataApprove();
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
        <div id='inbox_box'>
            <div id='inbox_profile'><img src={img_type}></img></div>
            <div id='inbox_mid'>
                <div id='info'>
                    <div id='info_box'>User ID : {item.user_id}</div>
                    <div id='info_box'>Title : {item.title}</div>
                    <div id='info_box' >Description : {item.description}</div>
                    <div id='info_box' >Value : {item.value}</div>
                    <div id='info_box' >Date : {dateProduct}</div>
                </div>
                <div id='mes_box'>
                    <div id='info_box2'>Email : {item.email}</div>
                    <div id='info_box2'>Email Password : {item.email_password}</div>
                    <div id='info_box2'>Username : {item.username}</div>
                    <div id='info_box2'>Password : {item.password}</div>
                </div>
            </div>
            <div id='box_foot'>
                <div id='foot_btn'><button onClick={handleshow} type="button" class="btn btn-outline-danger">Delete</button></div>
                <div id='foot_btn'><button onClick={handleshow2} type="button" class="btn btn-outline-warning">Update</button></div>
                <div id='foot_btn'><button onClick={handleshow3} type="button" class="btn btn-outline-info">Approve</button></div>
            </div>
        </div>

        {/* Modal Delete*/}
        <Modal show={show} key={item.id}>
            <Modal.Header>
                <Modal.Title>
                  <center>User ID :{item.user_id}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You Sure To Delete This Product for Approve
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={fun_delete}>Delete</Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Update */}
        <Modal show={show2} key={item.id}>
            <Modal.Header>
                <Modal.Title>
                  <center>Updare User ID :{item.user_id}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id='update_modal'>
                    <p className='p'>Email :</p>
                    <input value={email} onChange={e => setemail(e.target.value)} id='ip' type='text' placeholder='Enter Email...'/>

                    <p className='p'>Email Password :</p>
                    <input value={email_password} onChange={e => setemail_password(e.target.value)} id='ip' type='password' placeholder='Enter Email Password...'/>

                    <p className='p'>Username :</p>
                    <input value={username} onChange={e => setusername(e.target.value)} id='ip' type='text' placeholder='Enter Username...'/>

                    <p className='p'>Username Password :</p>
                    <input value={password} onChange={e => setpassword(e.target.value)} id='ip' type='password' placeholder='Enter Username Password...'/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_update}>Save</Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Approve*/}
        <Modal show={show3} key={item.id}>
            <Modal.Header>
                <Modal.Title>
                  <center>Approve User ID :{item.user_id}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You Sure To Approve This Product 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose3}>Close</Button>
                <Button onClick={fun_approve}>Approve</Button>
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
