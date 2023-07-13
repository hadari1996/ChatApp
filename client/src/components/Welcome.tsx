import React from 'react'
// import User from '../user';
import { User } from '../features/user/userModel';
import { FC } from "react";
import Robot from "../assets/🤖 Robot Waving.gif";
import "../Welcome.scss";
interface welcomeProps {
    currentUser: User;
  }
  

 const Welcome :FC<welcomeProps>|User = ({currentUser}: {currentUser: User;}) => {
  return (
    <div  className="container3">
        <img src={Robot} alt="Robot" />
        <h1>Welcome, <span> {currentUser.name}!</span></h1>
        <h3>Please select a chat room</h3>

    </div>
  )
}


export default Welcome;
