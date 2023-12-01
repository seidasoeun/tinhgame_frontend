import React, { useEffect, useState } from 'react';
import './css/homepage.css';

// route
import { Link } from 'react-router-dom';
import { Routes , Route , useNavigate } from "react-router-dom";

export default function HomePageBox({item}) {

    // Type & Date
    const[TypeProduct,setTypeProduct] = useState('');
    const[dateProduct,setdateProduct] = useState('');

    useEffect(()=>{
        fun_checkType();
        fun_getDateProduct();
    })

    //Onclick to Content
    const navigate = useNavigate();
    const DirectContent=()=>{
        navigate('/content/'+item.id);
    }

    // Check type
    const fun_checkType=()=>{
        if(item.type == "Clash Of Clan"){
            setTypeProduct('../../../img/coc.jpg');
        }else if(item.type == "Growtopia"){
            setTypeProduct('../../../img/gt.jpg');
        }else if(item.type == "Mobile Legend"){
            setTypeProduct('../../../img/mlbb.jpg');
        }
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
    <div onClick={DirectContent}>
        <a>
            <div id='home_box'>
                <div id='home_box_pic'>
                    <img src={TypeProduct}/>
                </div>
                <div id='home_text'>
                    <div id='home_title_content'><p>{item.title}</p></div>
                    <div id='home_description_content'>{item.description}</div>
                    <div id='home_date'>{dateProduct}</div>
                </div>
                <div id='home_value'>
                    <div id='price'>{item.value}</div>
                </div>
            </div>
        </a>
    </div>
  )
}
