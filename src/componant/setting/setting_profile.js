import React, { useEffect, useState } from 'react';
import Pic from '../../imgs/profile.png';

import "./css/setting_profile.css";
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//firebase
import { storage } from '../../firebase/Firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

//spinners
import ClipLoader from "react-spinners/ClipLoader";

// modal
import { Button, Modal } from 'react-bootstrap';

function Setting_profile() {

  const[User,setUser] = useState([]);
  const[name,setname] = useState('');
  const[email,setemail] = useState('');

  useEffect(()=>{
    fun_getCurrentUser();
  },[]);

  // get Current User
  const fun_getCurrentUser=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/getUser',{
      headers:{
          "Authorization" : "Bearer "+Token.token,
      }
    }).then((DataUser)=>{
      setUser(DataUser.data);
      setname(DataUser.data.name);
      setemail(DataUser.data.email);
    })
  }

  // Update Username & email
  const fun_UpdateUserinfo=()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      const data = {name,email};
      axios.put('http://127.0.0.1:8000/api/getUser/'+User.id,data,{
        headers:{
            "Authorization" : "Bearer "+Token.token,
        }
      }).then(()=>{
        fun_getCurrentUser();
        toast.success('Update Success ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }).catch((error)=>{
        toast.warn('Username or Email is already used !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        fun_getCurrentUser();
      })   
  }

  // Upload to firebase Img and update Img
  const [isloading,setisloading] = useState(false);
  const imageListRef = ref(storage,"tinhgame/");

  const[imageList,setimageList] = useState([]);
  const [validationInput,setvalidationInput] = useState(0);

    // modal
  const[show,setshow]=useState(false);
  const handleshow = () => setshow(true);
  const handleclose = () => setshow(false);

  const upload=(e)=>{
    e.preventDefault();
    setvalidationInput(validationInput+1);  // null + 1

    if(validationInput<1){   // 1 < 1 (true)
        const file = e.target.files[0];
        getUrl(file);
        setisloading(true);
    }else{
        setvalidationInput(0);
    }
  }

  const getUrl=(file)=>{
    if(!file) return;
    const nameFile = file.name;

    const storageRef = ref(storage, `/tinhgame/${nameFile}`);    // /files is the name of folder   , storageRef is the place to upload , name folder
    uploadBytes(storageRef,file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setimageList((prev) => [...prev,url]);
        setisloading(false);
      });      //spacific place    //that place
    });
  }

  useEffect(()=>{
    if(!getUrl){
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>{
              getDownloadURL(item).then((url)=>{
                setimageList((prev) => [...prev,url]);
                setisloading(true);
              });
            });
        });
    }
  },[]);

  //CSS spiner
  const override = {
    margin: "25px 25px ",
    width: "70px",
    height: "70px",
  };

  // modal close
  const btn_close=()=>{
    handleclose();
    setimageList([]);
    setvalidationInput(0);
  }

  // Button Save Update image
  const fun_submitUpdateImg=()=>{
    let image = "";
    imageList.map((val,i)=>{
      image = val;
    })

    const Token = JSON.parse(localStorage.getItem("auth"));
    const data = {image};
    axios.put('http://127.0.0.1:8000/api/getUser/'+User.id,data,{
      headers:{
          "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
      fun_getCurrentUser();
      handleclose();
      setimageList([]);
      setvalidationInput(0);
    })
  }
  

  return (
    <main id='main'>
        <div className="containers">
            <p id="p2">Edit Profile</p>
            <hr size="4" color="black" />
            <img src={User.image} className="img-thumbnail" />
            <button onClick={handleshow} id="buttons">
              Change Photo
            </button>
            <div className="mb-3">
                  <label for="ip_caption" className="form-label">Username :</label>
                  <input value={name} onChange={e=>setname(e.target.value)} type="text" className="form-control" id="ip_caption" />
            </div>
            <div className="mb-3">
                  <label for="ip_caption" className="form-label">Email :</label>
                  <input value={email} onChange={e=>setemail(e.target.value)} type="text" className="form-control" id="ip_caption" />
            </div>
            <button onClick={fun_UpdateUserinfo} id="buttons">save</button>
        </div>

        {/* toastify */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Modal Update */}
            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  Upload Image Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <label for="ip_img" className="form-label">Upload Image : selected first Image Only</label>
                  <input onChange={e => upload(e)} className="form-control" type="file" id="setting_updateImg" />
                  {/* <div id='loading'>
                  {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>
                        : <div></div>
                  }
                  </div> */}
                  <div id="post_photo">
                      {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={150} aria-label="Loading Spinner" data-testid="loader"/>
                      :imageList.map((url)=>{
                          return <div key={url} id="post_photo_box">
                              <img src={url} />
                          </div>
                      })}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={btn_close} >Close</Button>
                <Button onClick={fun_submitUpdateImg}>Save</Button>
              </Modal.Footer>
            </Modal>

    </main>
  )
}

export default Setting_profile