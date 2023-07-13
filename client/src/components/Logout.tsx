import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from "react-icons/bi"
import "../Logout.scss";
export const Logout = () => {
    const navigate= useNavigate();
    const handleClick= async()=>{
        try{
            const {data}= await axios.get(`/api/v1/users/logout`);
            const{logout}=data;
            if(logout) navigate("/");
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div><button onClick={handleClick}><BiPowerOff/>
        </button></div>
  )
}
