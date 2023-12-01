import useEffect , { useState } from 'react';
import Carousels from 'react-bootstrap/Carousel';
import './css/carousel.css';

import axios from 'axios';


function Carousel({Photo}) {  // Photo is Arr obj
  const [photo,setphoto] = useState(Photo);
  return (
    <Carousels>
        {
          photo.map((item)=>{
            return <Carousels.Item key={item.id}>
              <img 
                id='c_img'
                className="d-block w-100"
                src={item.image}
                alt="Third slide"
              />
            </Carousels.Item>
          })
        }
    </Carousels>
  );
}

export default Carousel;