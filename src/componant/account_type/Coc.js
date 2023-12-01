import React, { useEffect, useState } from 'react';
import { Link, redirect , useNavigate } from "react-router-dom";
import './css/coc.css';
import '../css/post.css'
import '../mediaQuery/post_Media.css';

// React-Icon
import {FcCustomerSupport} from 'react-icons/fc';
import {FcApproval} from 'react-icons/fc';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//firebase
import { storage } from '../../firebase/Firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

//spinners
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import PacmanLoader from "react-spinners/PacmanLoader";

// modal
import { Button, Modal } from 'react-bootstrap';

export default function Coc({type}) {

    // product
    const[lenProduct,setlenProduct] = useState([]); 

    // Direct
    const navigate = useNavigate();
    const Direct=()=>{
      navigate('/');
    }


    // firebase   
    const [isloading,setisloading] = useState(false);
    const imageListRef = ref(storage,"tinhgame/");

    const[imageList,setimageList] = useState([]);
    const [validationInput,setvalidationInput] = useState(0);

    const upload=(e)=>{
        e.preventDefault();
        setvalidationInput(validationInput+1);  // null + 1
    
        if(validationInput<5){   // 1 < 1 (true)
            const file = e.target.files[0];
            getUrl(file);
            setisloading(true);
        }else{
            setvalidationInput(0);
        }
      }

    const getUrl=(file)=>{
        if(!file) return;
        const nameFile = file.name;
    
        const storageRef = ref(storage, `/tinhgame/${nameFile}`);    // /files is the name of folder   , storageRef is the place to upload , name folder
        uploadBytes(storageRef,file).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((url)=>{
            setimageList((prev) => [...prev,url]);
            setisloading(false);
          });      //spacific place    //that place
        });
    }

    useEffect(()=>{
        fun_getlenproduct();
        if(!getUrl){
            listAll(imageListRef).then((response)=>{
                response.items.forEach((item)=>{
                  getDownloadURL(item).then((url)=>{
                    setimageList((prev) => [...prev,url]);
                    setisloading(true);
                  });
                });
            });
        }
    },[]);

    //CSS spiner
    const override = {
        margin: "25px 25px ",
        width: "70px",
        height: "70px",
    };

    // Firebase

        // post COC
    const[title,settitle] = useState("");
    const[description,setdescription] = useState("");
    const[value,setvalue] = useState("");
        // Account Info
    const[email,setemail] = useState("");
    const[email_password,setemail_password] = useState("");
    const[image,setimage] =  useState("");
        // give product_id
    const[product_id,setproduct_id] = useState(0);


    // Post btn
    const btn_post=(e)=>{
        e.preventDefault();
        if(lenProduct.length <= 6){
            if(title != "" && description != "" && value !== "" && email != "" && email_password != "" && imageList != "" ){
                e.preventDefault();
                handleshow2();
        
                const data = {title,description,value,email,email_password,type};
                const Token = JSON.parse(localStorage.getItem("auth"));
    
                axios.post('http://127.0.0.1:8000/api/approved',data,{
                    headers:{
                        "Authorization" : "Bearer "+Token.token,
                    }
                }).then((Data)=>{
                    imageList.map((val,i)=>{
                        const product_id = Data.data.id;
                        const image = val;
                        const data_url={image,product_id}  //Obj => can input image cant put rare image
                        axios.post('http://127.0.0.1:8000/api/approved_photo',data_url,{
                            headers:{
                                "Authorization" : "Bearer "+Token.token,
                            }
                        })
                    });
                }).then((Data)=>{
                    setTimeout(() => {
                        handleclose2();
                        Direct();
                    }, 1500);
                });
        
            }else{
                toast.warn('Please Insert All Form...!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }else{
            toast.warn('Sorry you have reach limit 6 product please delete 1 or more product to continue post ...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });        
        }
    }

    // Loading modal
    const[show2,setshow2]=useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    // get len product
    const fun_getlenproduct=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        console.log(Token.user.id)
        axios.get('http://127.0.0.1:8000/api/getproductbyidall/'+Token.user.id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataproduct)=>{
            setlenProduct(dataproduct.data)
        })
    }

  return (
    <div>
        <form className='form_type_game'>
            <hr size="5" color='black' />
            <h4>Post : Clash Of Clan</h4>

            <p className='p'>Title :</p>
            <input value={title} onChange={e=>settitle(e.target.value)} className='coc_ip' id='ip_title' type='text' placeholder='Title...'/>
            
            <p className='p'>Add Photos : 1-5</p>
            <input onChange={e => upload(e)} type="file" id='post_file' ></input>
            <div id="post_photo">
                {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={150} aria-label="Loading Spinner" data-testid="loader"/>
                :imageList.map((url)=>{
                    return <div key={url} id="post_photo_box">
                        <img src={url} />
                    </div>
                })}
            </div>

            <p className='p'>description :</p>
            <textarea value={description} onChange={e=>setdescription(e.target.value)} maxLength="50" cols="60" rows="5" className='coc_textarea'></textarea>

            <p className='p'>Value :</p>
            <input value={value} onChange={e=>setvalue(e.target.value)} className='coc_ip' id='ip_title' type='text' placeholder='value...'/>
            
            <hr size="5" color='black' />
            <h4>Account Information : supercell</h4>

            <p className='p'>Email :</p>
            <input value={email} onChange={e=>setemail(e.target.value)} className='coc_ip' type='text' placeholder='Email...'/>
            
            <p className='p'>Email Password :</p>
            <input value={email_password} onChange={e=>setemail_password(e.target.value)} className='coc_ip' type='password' placeholder='Password...'/>
            
            <div id="button">
                <button onClick={(e)=>btn_post(e)} id="post_button">Post</button>
            </div>

        </form>

        {/* Loading Modal */}
        <Modal show={show2}>
            <Modal.Body>
                <div id='modal_text'>Please Wait for Approve!</div><FcCustomerSupport size="50"/><FcApproval size="50"/>
            </Modal.Body>
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
