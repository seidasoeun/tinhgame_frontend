import "../css/app.css";
// import "./mediaQuery/proMedia.css";
import { Routes, Route , useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import PostBtn from "./setting_post/postBtn";
import FavoriteBlank from "./favorite/favorite_Blank";
import Setting from "./setting/setting";
import Head from "../Head";
// import Post_detail from "./router/Post_detail";

import Setting_profile from "./setting/setting_profile";
import Setting_pass from "./setting/setting_pass";

import {BiHomeAlt2} from 'react-icons/bi';
import { useEffect, useState } from "react";



function Profile() {
  //Redirt to Home use in Upload URL
  const navigate = useNavigate();
  const Direct=()=>{
    navigate('./PostBtn');
  }
  useEffect(()=>{
    Direct();
    fun_getDataUser();
    getStar(); 
  },[]);

  // get User data
  const[user,setuser] = useState([]);
  const fun_getDataUser=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/getUser',{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then((Data)=>{
      setuser(Data.data)
      fun_getDateProduct(Data.data)
    });
  }

  const[star,setstar] = useState("");
  const getStar=()=>{
    let n = localStorage.getItem("len_pass");
    let stars = '';
    for (let index = 0; index < n; index++) {
        const temp = "*";
        stars = stars + temp;
    }
    setstar(stars);
  }

  // Convert to Date Product
  const[dateProduct,setdateProduct] = useState('');

  const fun_getDateProduct=(item)=>{
    let date = item.created_at;
    let temp = "";
    for (let index = 0; index < 10; index++) {
      temp = temp + date[index];
    }
    setdateProduct(temp)
  }
  
  return (
    <div>
      <main>

        {/* HEAD */}
        <Head/>

        {/* Body */}
        <div className="p_body">
          <div className="p_body_info">
            <div className="pic">
              <img src={user.image} id="pic_profile" />
              <p id="pic_p">{user.name}</p>
            </div>
            <div className="info">
              <p>Created : {dateProduct}</p>
              <p>Email : {user.email}</p>
              <p>Password : {star} </p>
            </div>
          </div>
        </div>

        <div className="link">
          <Link to={"PostBtn"} id="post">My Post</Link>
          <Link to={"Favorite_Blank"} id="favorite">Statistics</Link>
          <Link to={"Setting"} id="setting">Setting</Link>
        </div>

        <div className="foot">
          <Routes>
              <Route path="PostBtn" element={<PostBtn />} />
              {/* <Route path="Post_detail/:id" element={<Post_detail/>}></Route> */}
              <Route path="Favorite_Blank" element={<FavoriteBlank />} />
              <Route path="Setting" element={<Setting />} >
                <Route path="setting_profile" element={<Setting_profile />}></Route>
                <Route path='Setting_pass' element={<Setting_pass />}></Route>
              </Route>
          </Routes>
        </div>

        {/* <!-- bootstrap JS --> */}
        {/* <script src="bootstrapJS/bootstrap.min.js"></script> */}
      </main>
    </div>
  );
}

export default Profile;