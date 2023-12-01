import React, { useEffect } from 'react';
import { Routes , Route , useNavigate } from "react-router-dom";

export default function Refresh() {
    //Direct to Home Admin
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('/Admin');
    }
    useEffect(()=>{
        Direct();
    })

  return (
    <div>

    </div>
  )
}
