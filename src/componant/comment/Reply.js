import React, { useEffect, useState } from 'react';
import './css/comment.css';
import axios from 'axios';

// react icon
import {FiMoreVertical} from 'react-icons/fi';
import {MdOutlineModeEdit} from 'react-icons/md';
import {AiOutlineDelete} from 'react-icons/ai';

// Popover react bootstrap
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

// modal
import { Modal } from 'react-bootstrap';

export default function Reply({item,ViewUser,fun_getReplyByID,setMoreCommentOff,setMoreCommentOn,}) {

    const[ReplyUser,setReplyUser] = useState([]);

    // Current Time
    const[Calculate_Hour,setCalculate_Hour] = useState(0);
    const[Calculate_Min,setCalculate_Min] = useState(0);
    const[Calculate_Day,setCalculate_Day] = useState(0);
    const[Caculate_Month,setCalculate_Month] = useState(0);

    // update comment
    const[message2,setmessage2] = useState(item.message);

    // reply
    const[message,setmessage] = useState('');

    // Popup View reply
    const[showReplypopup,setshowReplypopup] = useState(false);
    const handleshowpopup = () => setshowReplypopup(true);
    const handleclosepopup = () => setshowReplypopup(false);

    // hover
    const[c,setc] = useState(false);

    // Popover
    const [show, setShow] = useState(false);
    const target = useRef(null);

    // Update & delete ( comment & reply)
    const[check_com_user,setcheck_com_user] = useState(false);

    // Delete modal
    const[show2,setshow2]=useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    useEffect(()=>{
        fun_getUserReply();
        fun_currentTime(item.created_at);
    },[])

    // get User that reply
    const fun_getUserReply=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getUser/'+item.user_id,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then((DataUser)=>{
            setReplyUser(DataUser.data);
        })
    }

    // Hover
    const MouseIn=()=>{
        setc(true)
        setMoreCommentOff()
    }
    const MouseOut=()=>{
        setc(false)
        setMoreCommentOn()
    }

    // Popover & click outside to close

    const fun_popOver=(e)=>{
        if(ViewUser.id == item.user_id){
            setcheck_com_user(true)
        }
        setShow(true)
    }

    let handler=()=>{
        setShow(false);
    }

    useEffect(()=>{
        document.addEventListener("mousedown",handler);
    },[])

    // Edit & Update Reply , Comment

        // Update Reply Comment
    const fun_UpdateReplyComment=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const message = message2;
        const data = {message}
        axios.put('http://127.0.0.1:8000/api/reply/'+item.id,data,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            CancelReply(); // In have fun_getReplyByID()
        })   
    }

    // cancel reply when update
    const CancelReply=()=>{
        handleclosepopup();
        fun_getReplyByID();
    }

    // close reply if dont want updaate
    const CloseReply=()=>{
        handleclosepopup();
        setmessage2(item.message);
    }

    // Delete Reply
    const fun_DeleteReplyComment=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.delete('http://127.0.0.1:8000/api/reply/'+item.id,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            fun_getReplyByID();
            handleclose2();
        })        
    }


    // Caculate Time
    const fun_currentTime=(time)=>{

        // Data date & time  (-5 h)
        let Time = time;
        let hour = "";
        let min = "";
        let day = "";
        let month = "";
        for (let index = 0; index < 16; index++) {
            if(index == 5 || index == 6){   // day
                month = month + Time[index];
            }
            else if(index == 8 || index == 9){   // day
                day = day + Time[index];
            }
            else if(index == 11 || index == 12){  // hour
                hour = hour + Time[index];
            }else if(index == 14 || index == 15){  // min
                min = min + Time[index];
            }
        }        

        // Current Date & time
        let date = new Date();
        let temp = date.toISOString();   // (-5 h)
        let Currenthour = "";
        let Currentmin = "";
        let Currentday = "";
        let Currentmonth = "";
        // loop h , min of Current time
        for (let index = 0; index < 21; index++) {
            if(index == 5 || index == 6){   // current month
                Currentmonth = Currentmonth + temp[index];
            }            
            else if(index == 8 || index == 9){   // current day
                Currentday = Currentday + temp[index];
            }
            else if(index == 11 || index == 12){  // current hour
                Currenthour = Currenthour + temp[index];
            }else if(index == 14 || index == 15){  // current min
                Currentmin = Currentmin + temp[index];
            }
        }  
        var calculateMonth = 0;
        var calculateDay = 0;
        var calculateHour = 0;
        var calculateMin = 0;

        calculateMonth = parseInt(Currentmonth) - parseInt(month);
        setCalculate_Month(calculateMonth);


        calculateDay = parseInt(Currentday) - parseInt(day);
        if(calculateMonth == 0){
            setCalculate_Day(calculateDay);
        }else if(calculateMonth != 0){   // If move to next month and not yet full 30day of data day
            const mon = (30 - parseInt(day)) + parseInt(Currentday)
            calculateMonth = 0;
            calculateDay = mon;    // set show day only
            setCalculate_Day(mon);
            calculateHour = 1;
            calculateMin = 1;
            if(mon >= 29){  // if data day is full 30 => = 1month
                setCalculate_Month(parseInt(Currentmonth) - parseInt(month));
            }
            if(parseInt(day) == 31){  // if data date 31 & minth have 31 => +1
                const mon = (31 - parseInt(day)) + parseInt(Currentday)
                setCalculate_Day(mon)
            }
        }
        
        // calculate hour
        calculateHour = parseInt(Currenthour) - parseInt(hour);
        if(calculateDay == 0){
            setCalculate_Hour(calculateHour)
        }
        
        calculateMin = parseInt(Currentmin) - parseInt(min);
        if(calculateHour == 0){   // if not differnt hour => can count min
            setCalculate_Min(calculateMin)
        }  
        
        check_showtime(calculateMonth,calculateDay,Calculate_Hour,calculateMin);

    }

    // show & dont show time if = 0
    const[min,setmin] = useState(false);
    const[h,seth] = useState(false);
    const[d,setd] = useState(false);
    const[mon,setmon] = useState(false);

    const check_showtime=(month,day,hour,min)=>{
        if(month == 0){
            setmon(true);
            setd(false)   // show day
            if(day == 0){
                setmon(true);
                setd(true);
                seth(false);  // show hour   
                if(hour == 0){
                    setmon(true);
                    setd(true);
                    seth(true);
                    setmin(false);  // show min                
                }           
            }
        }
        else if(day == 0){
            setmon(true);
            setd(true);
            seth(false);  // show hour
        }
        else if(hour == 0){
            setmon(true);
            setd(true);
            seth(true);
            setmin(false);  // show min
        }
        else if(min == 0){
            setmon(true);
            setd(true);
            seth(true);
            setmon(true);  // show just now
        }
    }

  return (
    <div>
        <div onMouseEnter={MouseIn} onMouseLeave={MouseOut} id='reply_popup'>
            <div id='com_profile'>
                <img src={ReplyUser.image} />
            </div>
            <div id='com_content'>
                <div id='com_nameprofile'><span id='text_nameprofile'>{ReplyUser.name}</span></div>
                <div id='com_description'>
                    <span id='text_description'>{item.message}</span>
                </div>
                {/* Reply Popup Update */}
                {
                    showReplypopup && <div id='reply_popup'>
                            <div id='com_profile'>
                                <img src={ViewUser.image} />
                            </div>
                            {/* <input id='reply'></input> */}
                            <div id='reply_ip_body'>
                                <textarea value={message2} onChange={e => setmessage2(e.target.value)} id='reply'></textarea>
                                <div id='reply_btn'>
                                    <button onClick={CloseReply}>Cancel</button>
                                    <button onClick={fun_UpdateReplyComment}>Update</button>
                                </div>
                            </div>
                        </div>     
                } 
            </div>
            <div id='com_time'>
                <span id='text_time'>
                    {
                        mon?d?h?min?<div>just now !</div>
                                    :Calculate_Min+"min" // hour
                                :Calculate_Hour+"h" // day
                            :Calculate_Day+"d" // month
                        :Caculate_Month+"mon"
                    }
                </span>
            </div>
            {/*  More : */}
            {
                c?<div ref={target} onClick={e=>fun_popOver(e)} id='com_more'><FiMoreVertical size={20} /></div>
                :<div></div>
            }      
            
            {/* Pover */}
            <Overlay target={target.current} show={show} placement="right" >
                {
                    check_com_user?<Tooltip id="overlay-example">
                                        <button onClick={handleshowpopup}><MdOutlineModeEdit size={20}/>Edit</button>
                                        <button onClick={handleshow2}><AiOutlineDelete size={20}/>Delete</button>
                                    </Tooltip>
                    : <Tooltip id="overlay-example">
                        Can't modify someone message
                      </Tooltip>
                }
            </Overlay> 

            {/* Modal Delete */}
            <Modal show={show2} id='modal_comment'>
                <Modal.Header>
                    <Modal.Title>
                        <span id='modal_comment_text'>Delete Reply Comment</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id='modal_text_comment'>Are you sure to delete this message !</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleclose2}>Close</Button>
                    <Button onClick={fun_DeleteReplyComment}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </div>       
    </div>
  )
}
