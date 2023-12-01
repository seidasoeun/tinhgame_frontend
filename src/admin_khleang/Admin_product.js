import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './css/admin_product.css';
import axios from 'axios';

import Admin_product_card from './Admin_product_card';

// react icon
import {BsArrowReturnLeft} from 'react-icons/bs'

export default function Admin_product() {

    const {id} = useParams();

    const[DataProduct,setDataProduct] = useState([]);

    useEffect(()=>{
        fun_product();
    },[])

    const fun_product=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/getproductbyidall/'+id,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then((dataproduct)=>{
            setDataProduct(dataproduct.data);
        });       
    }

  return (
    <div>
       <div id='admin_product_body'>
            <div id='admin_product_head'>
                <div id='head_arrow'>
                    <Link to='/Admin/Admin_home'><BsArrowReturnLeft size='50'/></Link>
                </div>
                <div id='head_title'>
                    <p id='head_p'>User ID {id} Product :</p>
                </div>
            </div>
            <div id='admin_product_mid'>

                {
                    DataProduct.map((item)=>{
                        return <Admin_product_card key={item.id} item={item} fun_product={fun_product}/>
                    })
                }

            </div>
       </div>
    </div>
  )
}
