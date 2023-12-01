import React, { useEffect, useState } from 'react'
import "./css/favorite_Blank.css";

// react icon
import {FcFilingCabinet} from 'react-icons/fc';
import {FcInspection} from 'react-icons/fc';
import {FcDebt} from 'react-icons/fc';
import {FcMoneyTransfer} from 'react-icons/fc';
import {FcSurvey} from 'react-icons/fc';
import axios from 'axios';

function FavoriteBlank() {

  const[lenProduct,setlenProduct] = useState([]);
  const[lenApprove,setlenApprove] = useState([]);
  const[lenSold,setlenSold] = useState([]);
  const[totalvalue,settotalvalue] = useState('');

  useEffect(()=>{
    fun_getlenproduct();
    fun_getlenApprove();
    fun_getlenSold();
  },[])

  const fun_getlenproduct=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/product_user',{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then((dataProduct)=>{
      setlenProduct(dataProduct.data);
    });
  }

  const fun_getlenApprove=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/approve_len',{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then((dataApprove)=>{
      setlenApprove(dataApprove.data);
    });
  }

  const fun_getlenSold=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/sold',{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then((dataSold)=>{
      setlenSold(dataSold.data);
      fun_getValue(dataSold.data);
    });
  }

  const fun_getValue=(data)=>{
    console.log(data)
    let t = "";
    data.map((item)=>{
      t += " "+item.value;
    })
    settotalvalue(t);
  }

  return (
    <main id='main'>
      <div className="container_fav">

        {/* Col 1 */}
        <div id='stat_box'>
          <div id='stat_box_col' className='col1_bg'>
            {/* left */}
            <div id='stat_left'>
              <div id='left_head'>
                <div id='stat_total'>Total</div>
                <div id='stat_total'>Post Product</div>
              </div>
              <div id='left_body'>
                <div id='stat_total'>{lenApprove.length}</div>
              </div>
            </div>

            {/* right */}
            <div id='stat_right'>
              <div id='temp_box'></div>
              <div id='stat_icon'>
                <FcSurvey size='75'/>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div id='stat_box'>
          <div id='stat_box_col' className='col2_bg'>
            {/* left */}
            <div id='stat_left'>
              <div id='left_head'>
                <div id='stat_total'>Total</div>
                <div id='stat_total2'>Approved Product</div>
              </div>
              <div id='left_body'>
                <div id='stat_total'>{lenProduct.length}</div>
              </div>
            </div>

            {/* right */}
            <div id='stat_right'>
              <div id='temp_box'></div>
              <div id='stat_icon'>
                <FcInspection size='75'/>
              </div>
            </div>
          </div>
        </div>


        {/* Col 3 */}
        <div id='stat_box'>
          <div id='stat_box_col' className='col3_bg'>
            {/* left */}
            <div id='stat_left'>
              <div id='left_head'>
                <div id='stat_total'>Total</div>
                <div id='stat_total'>Product Sold</div>
              </div>
              <div id='left_body'>
                <div id='stat_total'>{lenSold.length}</div>
              </div>
            </div>

            {/* right */}
            <div id='stat_right'>
              <div id='temp_box'></div>
              <div id='stat_icon'>
                <FcDebt size='65'/>
              </div>
            </div>
          </div>
        </div>


        {/* Col 4 */}
        <div id='stat_box'>
          <div id='stat_box_col' className='col4_bg'>
            {/* left */}
            <div id='stat_left'>
              <div id='left_head'>
                <div id='stat_total'>Total</div>
                <div id='stat_total'>Sold Value</div>
              </div>
              <div id='left_body2'>
                <div id='temp'>
                  {totalvalue}
                </div>
              </div>
            </div>

            {/* right */}
            <div id='stat_right'>
              <div id='temp_box'></div>
              <div id='stat_icon'>
                <FcMoneyTransfer size='65'/>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* <div id='temp'>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </div> */}
    </main>
  )
}

export default FavoriteBlank