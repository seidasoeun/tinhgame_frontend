import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import Post_content from './Post_content';

import "./css/app.css";
import "./css/homepage.css";

import Head from './Head';
import HomePageBox from './HomePageBox';

// icon
import {FcApproval} from 'react-icons/fc';
import {FcBinoculars} from 'react-icons/fc';
import {FcTodoList} from 'react-icons/fc';
import {FcCollaboration} from 'react-icons/fc';
import {FaBirthdayCake} from 'react-icons/fa';
import {BiHomeAlt2} from 'react-icons/bi';
import { render } from 'react-dom';

export default function HomePage() {

  // Link Type
  const[all,setall] = useState(false);
  const[coc,setcoc] = useState(false);
  const[gt,setgt] = useState(false);
  const[mlbb,setmlbb] = useState(false);

  // get approve product to show
  const[allProduct,setallProduct] = useState([]);
  const[allCoc,setallCoc] = useState([]);
  const[allGt,setallGt] = useState([]);
  const[allMlbb,setallMlbb] = useState([]);

  useEffect(()=>{
    fun_getAllProduct();
    fun_getAllCoc();
    fun_getAllGt();
    fun_getAllMlbb();

    fun_checkSelectType();
  },[]);

  // all product
  const fun_getAllProduct=()=>{
    axios.get('http://localhost:8000/api/homepage').then((Data)=>{
      setallProduct(Data.data);
    });
  }

  // all Coc
  const fun_getAllCoc=()=>{
    let type = "Clash Of Clan";
    axios.get('http://localhost:8000/api/getproductbytype/'+type).then((DataCoc)=>{
      setallCoc(DataCoc.data);
    });
  }  

  // all Gt
  const fun_getAllGt=()=>{
    let type = "Growtopia";
    axios.get('http://localhost:8000/api/getproductbytype/'+type).then((DataGt)=>{
      setallGt(DataGt.data);
    });
  }  

  // all Mlbb
  const fun_getAllMlbb=()=>{
    let type = "Mobile Legend";
    axios.get('http://localhost:8000/api/getproductbytype/'+type).then((DataMlbb)=>{
      setallMlbb(DataMlbb.data);
    });
  }  

  // swtich to Type
  const getAllType=()=>{
    setall(false);
  }

  const getAllCoc=()=>{
    setall(true);
    setcoc(false);
  }

  const getAllGt=()=>{
    setall(true);
    setcoc(true);
    setgt(false);
  }

  const getAllMlbb=()=>{
    setall(true);
    setcoc(true);
    setgt(true);
    setmlbb(false);
  }

  // Check Select Type
  const fun_checkSelectType=()=>{
    if(localStorage.getItem('coc')){
      getAllCoc();
      localStorage.removeItem('coc');
    }else if(localStorage.getItem('gt')){
      getAllGt();
      localStorage.removeItem('gt');
    }else if(localStorage.getItem('mlbb')){
      getAllMlbb();
      localStorage.removeItem('mlbb');
    }
  }

  return (
    <main>
        {/* HEAD */}
        <Head/>

        {/* BODY */}
        <div id='home_body'>
            <div id='home_body2'>
                {/* banner */}
                <div id='home_banner'>

                </div>
                {/* title */}
                <div id='home_title'>
                    <center>
                        <p><b>Welcome to TinhGame - ទិញហ្គេម <FcApproval size="25px"/> . You can Buy/Sell an account game in this website  <FcBinoculars size="30px"/> .</b></p>
                    </center>
                </div>
                {/* LINK */}
                <div id='home_link'>
                    <a id='alltype' onClick={getAllType}><div id='alltype_color'><p>All Type</p></div></a>  {/*<FcTodoList/> All Type*/}
                    <a id='coc' onClick={getAllCoc}><div id='coc_color'><p>Clash Of Clan</p></div></a>               {/*<FcCollaboration/> Clash Of Clan*/}
                    <a id='gt' onClick={getAllGt}><div id='gt_color'><p>Growtopia</p></div></a>           {/*<FaBirthdayCake color='yellow'/> Growtopia*/}
                    <a id='mlbb' onClick={getAllMlbb}><div id='mlbb_color'><p>Mobile Legend</p></div></a>               {/*<FcCollaboration/> Mobile Legend*/}
                </div>
                <div id='home_content'>               {/* if bir ture (web true => bir , web false => wed ) , if bir false => Alldata */}
                  {/* {Bir?Wed?                           
                  
                  birthday.map((item)=>{
                    return  <Post_content key={item.id} item={item} />             
                  })
                  :wedding.map((item)=>{
                    return  <Post_content key={item.id} item={item} />             
                  })
                  
                  :Alldata.map((item)=>{
                    return  <Post_content key={item.id} item={item} />             
                  })} */}

                  {
                    all? coc? gt? mlbb? <div></div>
                                : allMlbb.map((item)=>{
                                  return <HomePageBox key={item.id} item={item} />
                                })
                            : allGt.map((item)=>{
                              return <HomePageBox key={item.id} item={item} />
                            })
                        : allCoc.map((item)=>{
                          return <HomePageBox key={item.id} item={item} />
                        })
                    : allProduct.map((item)=>{
                        return <HomePageBox key={item.id} item={item} />
                      })
                  }

                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div id="home_footer">
          <div id='home_footer_text'>TinhGame - ទិញហ្គេម</div>
        </div>



    </main>
  )
}
