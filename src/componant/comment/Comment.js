import React, { useEffect, useState } from 'react';
import './css/comment.css';
// media
import './css/media.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// react icon
import {IoIosArrowDown} from 'react-icons/io';
import {IoIosArrowUp} from 'react-icons/io';
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

import Reply from './Reply';

export default function Comment({item,ViewUser,fun_getAllcomment}) {

    const[User,setUser] = useState([]);

    // Current Time
    const[Calculate_Hour,setCalculate_Hour] = useState(0);
    const[Calculate_Min,setCalculate_Min] = useState(0);
    const[Calculate_Day,setCalculate_Day] = useState(0);
    const[Caculate_Month,setCalculate_Month] = useState(0);

    // update comment
    const[message2,setmessage2] = useState(item.message);

    // hover
    const[c,setc] = useState(false);

    // reply
    const[message,setmessage] = useState('');
    const[DataReply,setDataReply] = useState([]);

    // Popover
    const [show, setShow] = useState(false);
    const target = useRef(null);

    // Show / close popupReply
    const[showReplypopup,setshowReplypopup] = useState(false);
    const handleshowpopup = () => setshowReplypopup(true);
    const handleclosepopup = () => setshowReplypopup(false);
        // popup update
    const[showReplypopupUpdate,setshowReplypopupUpdate] = useState(false);
    const handleshowpopupUpdate = () => setshowReplypopupUpdate(true);
    const handleclosepopupUpdate = () => setshowReplypopupUpdate(false);

    const[showViewreply,setshowViewreply] = useState(false);
    const handleshowViewreply = () => setshowViewreply(true);
    const handlecloseViewreply = () => setshowViewreply(false); 

    // Update & delete ( comment & reply)
    const[check_com_user,setcheck_com_user] = useState(false);

    // Delete modal
    const[show2,setshow2]=useState(false);
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);
    
        // View Reply
    const[a,seta] = useState(false);
    const[b,setb] = useState(false);

    useEffect(()=>{
        fun_getComment();
        fun_getReplyByID();
        fun_currentTime(item.created_at);
    },[]);

    // Use get comment for get user img 
    const fun_getComment=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/comment/'+item.user_id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((datacomment)=>{
            setUser(datacomment.data.User);
        })     
    }
    
    // Get Reply
    const fun_getReplyByID=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/reply/'+item.id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((Datareply)=>{
            setDataReply(Datareply.data);
            fun_checkViewReply(Datareply.data);
        })      
    }

    // Check Lenght View Reply
    const fun_checkViewReply=(aa)=>{
        if(aa.length != 0){
            seta(true);
            setb(true);
        }else{
            seta(false);
            setb(false);
        }
    }


    // swtich Arrow 
    const fun_switchToUp=()=>{
        seta(true);
        setb(false);
        handleshowViewreply();
    }
    const fun_switchToDown=()=>{
        seta(true);
        setb(true);
        handlecloseViewreply();
    }

    // Submit Reply
    const fun_reply=()=>{
        if(message != ""){
            const Token = JSON.parse(localStorage.getItem("auth"));
            const user_id = ViewUser.id;
            const product_id = item.product_id;
            const comment_id = item.id;
            const data = {user_id,product_id,message,comment_id}
            axios.post('http://127.0.0.1:8000/api/reply',data,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            }).then(()=>{
                setmessage('');
                handleclosepopup();
                fun_getReplyByID();
            })   
        }else{
            alert("HELLO");
        }  
    }      

    // Hover
    const MouseIn=()=>{
        setc(true)
    }
    const MouseOut=()=>{
        setc(false)
    }
        // Config in reply
    const setMoreCommentOff=()=>{
        setc(false)
    }
    const setMoreCommentOn=()=>{
        setc(true)
    }

    // More
    const fun_more=()=>{
        alert("HELLO");
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
    const test=()=>{
        alert("HELLO");
    }

    const fun_UpdateReply=()=>{
        setshowReplypopup(true);
        setshowReplypopupUpdate(true);
    }


    // Update Comment
    const fun_UpdateComment=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        const message = message2;
        const data = {message}
        axios.put('http://127.0.0.1:8000/api/comment/'+item.id,data,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            fun_CloseUpdateReply();  // In have fun_getAllcomment()
        })        
    }

    // cancel reply when update
    const fun_CloseUpdateReply=()=>{
        setmessage('');
        fun_getAllcomment();
        setshowReplypopup(false);
        setshowReplypopupUpdate(false);
    }

    // close comment if dont want updaate
    const CloseComment=()=>{
        handleclosepopup();
        setmessage2(item.message);
    }

    // Cancel Reply
    const CloseReply=()=>{
        handleclosepopup();
        setmessage('');
    }

    // Delete Comment & All reply in Comment
    const fun_DeleteComment=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.delete('http://127.0.0.1:8000/api/comment/'+item.id,{
            headers:{
              "Authorization" : "Bearer "+Token.token,
            }
        }).then(()=>{
            axios.delete('http://127.0.0.1:8000/api/deletereplycustome/'+item.id,{
                headers:{
                "Authorization" : "Bearer "+Token.token,
                }
            })
        }).then(()=>{
            fun_getAllcomment();
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
        }
        if(calculateMonth != 0){   // If move to next month and not yet full 30day of data day
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
        
        // calculate hour   ** ta lers day hz lem kvol hour hz
        calculateHour = parseInt(Currenthour) - parseInt(hour);
        if(calculateDay == 0){
            setCalculate_Hour(calculateHour)
        }
        
        calculateMin = parseInt(Currentmin) - parseInt(min);
        if(calculateHour == 0){   // if not differnt hour => can count min
            setCalculate_Min(calculateMin)
        }  
        
        check_showtime(calculateMonth,calculateDay,calculateHour,calculateMin);

        // Not yet Calculate 60Min = 1h , 24h = 1d
        //now just calculte differt hour = 1h , differt day = 1d
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
    <div id='comment2_body'>

        <div onMouseEnter={MouseIn} onMouseLeave={MouseOut} id='com_card'>
            <div id='com_profile'>
                <img src={User.image} />
            </div>
            <div id='com_content_body'>
                <div id='com_content'>
                    <div id='com_nameprofile'><span id='text_nameprofile'>{User.name}</span></div>
                    <div id='com_description'>
                        <span id='text_description'>{item.message}</span>
                    </div>
                </div>
                <div id='com_reply'>
                    {/* button reply */}
                    <Link onClick={handleshowpopup} id='link_reply'>Reply</Link>
                    {/* Link view reply */}
                    {   
                        a?b?<Link onClick={fun_switchToUp} id='link_viewreply'><IoIosArrowDown size={20} />{DataReply.length} replies</Link>
                            :<Link onClick={fun_switchToDown} id='link_viewreply'><IoIosArrowUp size={20} />{DataReply.length} replies</Link>
                        :<div></div>
                    }
                </div>
                {/* Replay text pop up */}
                {
                    showReplypopup?showReplypopupUpdate?<div id='reply_popup'>
                                                            <div id='com_profile'>
                                                                <img src={ViewUser.image} />
                                                            </div>
                                                            {/* <input id='reply'></input> */}
                                                            <div id='reply_ip_body'>
                                                                <textarea value={message2} onChange={e => setmessage2(e.target.value)} id='reply'></textarea>
                                                                <div id='reply_btn'>
                                                                    <button onClick={CloseComment}>Cancel</button>
                                                                    <button onClick={fun_UpdateComment}>Update</button>
                                                                </div>
                                                            </div>
                                                        </div>
                        :   <div id='reply_popup'>
                                <div id='com_profile'>
                                    <img src={ViewUser.image} />
                                </div>
                                {/* <input id='reply'></input> */}
                                <div id='reply_ip_body'>
                                    <textarea value={message} onChange={e => setmessage(e.target.value)} id='reply'></textarea>
                                    <div id='reply_btn'>
                                        <button onClick={CloseReply}>Cancel</button>
                                        <button onClick={fun_reply}>Reply</button>
                                    </div>
                                </div>
                            </div>
                    : <div></div>
                    
                }

                {/* Reply */}
                {
                    showViewreply && DataReply.map((item)=>{
                        return <Reply key={item.id} item={item} ViewUser={ViewUser} fun_getReplyByID={fun_getReplyByID} setMoreCommentOff={setMoreCommentOff} setMoreCommentOn={setMoreCommentOn} />
                    })
                }

            </div>
            <div id='com_time'>
                <span id='text_time'>
                    {/* Time */}
                    {
                        mon?d?h?min?<div>just now !</div>
                                    :Calculate_Min+"min" // hour
                                :Calculate_Hour+"h" // day
                            :Calculate_Day+"d" // month
                        :Caculate_Month+"mon"
                    }
                </span>
            </div>
            {
                c?<div ref={target} onClick={e=>fun_popOver(e)} id='com_more'><FiMoreVertical size={20} /></div>
                :<div></div>
            }
            <Overlay target={target.current} show={show} placement="right" >
                {
                    check_com_user?<Tooltip id="overlay-example">
                                        <button onClick={fun_UpdateReply}><MdOutlineModeEdit size={20}/>Edit</button>
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
                        <span id='modal_comment_text'>Delete Comment</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id='modal_text_comment'>Are you sure to delete this message !</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleclose2}>Close</Button>
                    <Button onClick={fun_DeleteComment}>Yes</Button>
                </Modal.Footer>
            </Modal>


        </div>

    </div>
  )
}
