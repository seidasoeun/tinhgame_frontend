import React, { useEffect , useState } from 'react';
import "./css/post.css";
import "./mediaQuery/post_Media.css";

import { Link, redirect , useNavigate } from "react-router-dom";
import Axios from "axios";

import Head from '../Head';
import Coc from './account_type/Coc';
import Gt from './account_type/Gt';
import Mlbb from './account_type/Mlbb';
import Plz_select from './account_type/Plz_select';

//firebase
import { storage } from '../firebase/Firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

//spinners
import ClipLoader from "react-spinners/ClipLoader";

function Post() {
    // Logic templet
    const[a,seta] = useState(false);
    const[b,setb] = useState(false);
    const[c,setc] = useState(false);
    const [selectService,setselectService] = useState(" ");
    
    const fun_type=(value)=>{
        console.log(value);
        if(value==undefined || value=="Select Type Account"){
            seta(false);
        }
        else if(value=="Clash Of Clan"){
            seta(true)
            setb(false)
        }
        else if(value=="Growtopia"){
            seta(true)
            setb(true)
            setc(false)
        }
        else if(value=="Mobile Legend"){
            seta(true)
            setb(true)
            setc(true)
        }
    }

    useEffect(()=>{
        fun_type();
    },[])


  return (
    <main> 
        {/* HEAD */}
        <Head/>

        {/* FORM */}
        <div className="post_body">
            <div id="post_body_head">
                <Link to={"/"}><a href="" id="p_arrow"><img src="./img/arrow.png" /></a></Link>
                <p id="head_post_body"><b>Post Your Service</b></p>
            </div>
            <hr size="3" color="#BDC3C7" />
            <div className="post_form">
                <form>
                    <div  id='form_title'>
                        <div id='title_post'><p>Type of game Account :</p></div>
                        <div id='title_note'>
                            <p>**Noted** : All the product that you sold will pay tax 20% to Company</p>
                            <p>**Noted** : The product that you post will approved by our Company</p>
                            <p>**Noted** : Your product will be change by our Company to sell and you can refund</p>
                        </div>
                    </div>
                    <select id="post_box" value={selectService} onChange={(e) => {setselectService(e.target.value);fun_type(e.target.value)}} >
                        <option selected>Select Type Account</option>
                        <option >Clash Of Clan</option>
                        <option >Growtopia</option>
                        <option >Mobile Legend</option>
                    </select>
                    <div id='post_type_body'>
                        {
                            a?b?c?<Mlbb type={selectService}/>
                                    :<Gt type={selectService}/>
                                :<Coc type={selectService}/>
                            :<Plz_select/>
                        }
                    </div>
                    


                </form>
            </div>
        </div>
    </main>
  )
}

export default Post