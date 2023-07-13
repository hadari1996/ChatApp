import React, { FC } from 'react'
import "../ChatInputs.scss";
import {IoMdSend} from "react-icons/io" 
import Picker, { IEmojiData } from "emoji-picker-react"
import {BsEmojiSmileFill} from "react-icons/bs"
import { useState } from 'react';

 interface ChatInputsProps{
    handleSendMsg:CallableFunction;
}
 const ChatInputs :FC<ChatInputsProps>=  ({handleSendMsg}) => {
    
    const [showEmojiPicker, setShowEmojiPicker ] =useState(false);
    const [msg, setMsg]= useState("");

     const handleEmojiPickerHideShow =()=>{
        setShowEmojiPicker(!showEmojiPicker);
     }

     const handleEmojiClick=(event:React.MouseEvent<Element, MouseEvent>, emojiObject:IEmojiData) =>{
        let message= msg;
        message+=emojiObject.emoji;
        setMsg(message);

     }

     const sendChat=(event:Event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg,  Date());
            setMsg('')
        }
     }
  return (    <div className='container5' >
        <div className="btn-container">
            <div className="emoji">
                <BsEmojiSmileFill  onClick={handleEmojiPickerHideShow}/>{
                    showEmojiPicker && <Picker   onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(event: React.FormEvent<HTMLFormElement>|any)=>sendChat(event)}>
            <input type="text" placeholder='Type your message' value={msg} onChange={(event)=>
            setMsg(event.target.value)}/>
            <button type="submit" className='submit'>
            <IoMdSend/>
            </button>
             </form>

    </div>
  )
}


export default ChatInputs;