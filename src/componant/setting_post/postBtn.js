import React, { useEffect, useState } from 'react';
import "./css/postBtn.css";

import Card_user from './card_user';

import axios from 'axios';

function PostBtn() {
  const [postdata, setpostdata] = useState([]);
  const [productUser,setproductUser] = useState([]);

  //delete filter UI  (no window reload)
  const deleteUI=(id)=>{
    setpostdata(postdata.filter(postdata => postdata.id !== id))
  }

  //Update UI  (no window reload)
  const updateUI=(id,update)=>{
    setpostdata(postdata.map((postdata) => postdata.id === id ? update : postdata))
  }

  useEffect(()=>{
    fun_getProductUser();
  },[])

  const fun_getProductUser=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/product_user',{
      headers:{
          "Authorization" : "Bearer "+Token.token,
      }
    }).then((DataProduct)=>{
      setproductUser(DataProduct.data);
    })
  }

  return (
    <main id='main'>
      <div className="post_btn">
        {/* {postdata && postdata.map((item) => {
          return <Post_card key={item.id} item={item} deleteUI={deleteUI} updateUI={updateUI}/>
        })} */}

        {
            productUser.map((item)=>{
              return <Card_user item={item} key={item.id} fun_getProductUser={fun_getProductUser}/>
            })
        }

      </div>
    </main>
  )
}

export default PostBtn