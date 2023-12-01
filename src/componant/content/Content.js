import React, { useEffect, useState } from 'react';
import './css/content.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// react icon
import {AiOutlineComment} from 'react-icons/ai';
import {AiOutlineSend} from 'react-icons/ai';
import {IoIosArrowBack} from 'react-icons/io';
import {FcCustomerSupport} from 'react-icons/fc';
import {FcApproval} from 'react-icons/fc';
import {FcSms} from 'react-icons/fc';

//spinners
import ClipLoader from "react-spinners/ClipLoader";

//Modal
import { Button, Modal } from 'react-bootstrap';

import Head from '../../Head';
import Carousel from './Carousel';
import Comment from '../comment/Comment';

export default function Content() {

    const {id} = useParams();   // Default Name {id}

    const[Product,setProduct] = useState([]);  //Arr obj
    const[User,setUser] = useState([]);   //Obj
    const[Photo,setPhoto] = useState([]); //Arr obj

    // comment submit
    const[message,setmessage] = useState('');
    const[Datacomment,setDatacomment] = useState([]);

    const[ViewUser,setViewUser] = useState([]);
    const [isloading,setisloading] = useState(false);

    // Date & Type
    const[dateProduct,setdateProduct] = useState('');
    const[TypeProduct,setTypeProduct] = useState('');

    // Modal Buy Now
    const[show,setshow]=useState(false);
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);

    // Loading modal
    const[show2,setshow2]=useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    //CSS spiner
    const override = {
        margin: "200px 255px",
        width: "100px",
        height: "100px",
    };

    useEffect(()=>{
        getProduct();
        getViewUser();
        fun_getAllcomment();
    },[])

    const getProduct=()=>{
        setisloading(true);
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/product_user/'+id,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((Data)=>{
            setProduct(Data.data);
            setUser(Data.data.User);
            setPhoto(Data.data.product_photo);
            fun_getDateProduct(Data.data.created_at);
            fun_checkType(Data.data.type);
            setisloading(false);
        })
    }

    // Get User that View
    const getViewUser=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getUser',{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((datauser)=>{
            setViewUser(datauser.data);
        })   
    }

    // Convert to Date Product
    const fun_getDateProduct=(Date)=>{
        let date = Date;
        let temp = "";
        for (let index = 0; index < 10; index++) {
            temp = temp + date[index];
        }
        setdateProduct(temp)
    }

    // Check type
    const fun_checkType=(type)=>{
        if(type == "Clash Of Clan"){
            setTypeProduct('../../../img/coc.jpg');
        }else if(type == "Growtopia"){
            setTypeProduct('../../../img/gt.jpg');
        }else if(type == "Mobile Legend"){
            setTypeProduct('../../../img/mlbb.jpg');
        }
    }

    // get All comment
    const fun_getAllcomment=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getallcommentbyproductid/'+id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((datacomment)=>{
            setDatacomment(datacomment.data);
        })  
    }   

    // Submit comment
    const fun_comment=()=>{
        if(message != ""){
            const Token = JSON.parse(localStorage.getItem("auth"));
            const product_id = Product.id;
            const data = {product_id,message};
            axios.post('http://127.0.0.1:8000/api/comment',data,{
                headers:{
                "Authorization" : "Bearer "+Token.token,
                }
            }).then(()=>{
                setmessage('');
                fun_getAllcomment();
            })  
        }else{
            alert("HELlo");
        }      
    }

    // Buy Now
    const fun_buyNow=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const buyer = ViewUser.name;
        const buyer_id = ViewUser.id;
        const seller = User.name;
        const seller_id = User.id;
        const value = Product.value;
        const product_id = Product.id;
        const type = Product.type;
        const data = {buyer,buyer_id,seller,seller_id,value,type,product_id};
        axios.post('http://127.0.0.1:8000/api/buyproduct',data,{
            headers:{
            "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            handleclose();
            handleshow2();
            setTimeout(() => {
                handleclose2();
            }, 3500);
        }) 
    }

  return (
    <div id='content_body'>
        <Head/>
        {/* <button onClick={testString}></button> */}
        <div id='content'>
            <div id='c_back'>
                <div id='back_block'>
                    <Link to={'/'}><IoIosArrowBack size={40} /></Link>
                </div>
            </div>
            <div id='c_body'>
                <div id='c_body2'>
                    <div id='block1'>
                        <div id='c_title'>
                            <span id='c_title_text'>{Product.title}</span>
                        </div>
                        <div id='c_type'>
                            {Product.type}
                        </div>
                        {/* Carasoul Slide*/}
                        <div id='c_slide'>
                            {isloading?<ClipLoader id='c_spiner' color={'white'}  loading={isloading} size={150} aria-label="Loading Spinner" data-testid="loader"/>
                                :<Carousel key={User.id} Photo={Photo}/>
                            }
                        </div>
                        {/* Description */}
                        <div id='c_description'>
                            <div id='title_description'>
                                <span id='mid_text_title'>Description</span>
                                <hr size="6" color='white'/>
                            </div>
                            <div id='description'>
                            <span id='mid_text'>{Product.description}</span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div id='comment_body'>
                            <div id='pic_comment'>
                                <AiOutlineComment  size={30} color='white'/>
                                <span id='mid_text_title'>Comment</span>
                            </div>
                            <div id='comment'>
                                <div id='comment_display'>
                                    {
                                        Datacomment.map((item)=>{
                                           return <Comment key={item.id} item={item} ViewUser={ViewUser} fun_getAllcomment={fun_getAllcomment}/>
                                        })
                                    }
                                </div>
                                <div id='ip_comment'>
                                    <div id='user_profile'>
                                        <img src={ViewUser.image}/>
                                    </div>
                                    <div id='ip'>
                                        <textarea value={message} onChange={e => setmessage(e.target.value)} placeholder='Write a comment...'></textarea>
                                        <a id='ip_btn' onClick={fun_comment}>
                                            <AiOutlineSend size={30}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Noted */}
                        <div id='c_noted'>
                            <div id='title_noted'>
                                <span id='mid_text_title'>Noted</span>
                                <hr size="6" color='white'/>
                            </div>
                            <div id='noted'>
                               *** Please Comment to Accept the price with the owner before click buy now ! ***  
                            </div>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div id='block2'>
                        <div id='empty_box'>

                        </div>
                        <div id='info_content'>
                            <div id='pic_type'>
                                <img src={TypeProduct} />
                            </div>
                            <div id='c_info'>
                                <div id='c_value'>
                                    <span id='info_text'>{Product.value}</span>
                                </div>
                                <button onClick={handleshow} id='c_btn'>BUY NOW</button>
                                <div id='owner_info'>
                                    <div id='info_left'>
                                        <div id='c_left_box'>
                                            <span id='mid_text'>Profile :</span>
                                        </div>
                                        <div id='c_left_box'>
                                            <span id='mid_text'>Owner :</span>
                                        </div>
                                        <div id='c_left_box'>
                                            <span id='mid_text'>Type :</span>
                                        </div>
                                        <div id='c_left_box'>
                                            <span id='mid_text'>Release Date :</span>
                                        </div>
                                    </div>
                                    <div id='c_info_right'>
                                        <div id='c_right_box'>
                                            <img src={User.image}/>
                                        </div>
                                        <div id='c_right_box'>
                                            <span id='info_text'>{User.name}</span>
                                        </div>
                                        <div id='c_right_box'>
                                            <span id='info_text'>{Product.type}</span>
                                        </div>
                                        <div id='c_right_box'>
                                            <span id='info_text'>{dateProduct}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="home_footer">
          <div id='home_footer_text'>TinhGame - ទិញហ្គេម</div>
        </div>

        {/* Modal BuyNow */}
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>
                    Buy This Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to buy this product ?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={fun_buyNow}>Yes</Button>
            </Modal.Footer>
        </Modal>

        {/* Loading Modal */}
        <Modal show={show2}>
            <Modal.Body>
                <div id='modal_text'>Please Wait for Admin Inbox Link Messager through your Inbox !</div><FcCustomerSupport size="50"/><FcSms size="50" /><FcApproval size="50"/>
            </Modal.Body>
        </Modal>

    </div>
  )
}
