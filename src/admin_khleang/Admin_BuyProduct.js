import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Admin_BuyCardProduct from './Admin_BuyCardProduct';

export default function Admin_BuyProduct() {

    const[BuyProduct,setBuyProduct] = useState([]);

    useEffect(()=>{
        fun_getAllBuyProduct();
    },[]);

    // get All buy product
    const fun_getAllBuyProduct=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://127.0.0.1:8000/api/buyproduct',{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then((DataAllProduct)=>{
            setBuyProduct(DataAllProduct.data);
        })
    }

  return (
    <div id='inbox_body3'>
        <div id='inbox_head'>
            <div id='head_right'>
                <span id='span2'>BUYER PRODUCT</span>
            </div>
        </div>

        {
            BuyProduct.map((item)=>{
                return <Admin_BuyCardProduct key={item.id} item={item} fun_getAllBuyProduct={fun_getAllBuyProduct} />
            })
        }

    </div>
  )
}
