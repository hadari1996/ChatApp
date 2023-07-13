import React, { useEffect, useRef, useState } from "react";
// import User from "../user";
import { FC } from "react";
import Robot from "../assets/🤖 Robot Waving.gif";
import "../ChatContainer.scss";
import { Logout } from "./Logout";
import ChatInputs from "./ChatInputs";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import { Socket } from "socket.io-client";
import { Message } from "../message/messege";
import { User } from './../features/user/userModel';


interface ChatContainerProps {
  currentChat: User | undefined;
  currentUser: User | undefined,
  socket:any,
}



const ChatContainer: FC<ChatContainerProps>  = ({
  currentChat,
  currentUser,
  socket,
}: {
  currentChat: User | undefined;
  currentUser: User | undefined;
  socket: any;
}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({})
  const scrollRef =React.useRef<null | HTMLInputElement>(null);
  const getAllMessages = async () => {
    if(currentChat && currentUser != undefined){
      const response = await axios.post(`/api/v1/messages/getAllMessage`, {
        from: currentUser._id,
        to: currentChat._id,
   
      });
  
      setMessages(response.data);
    }

  };
  const handleSendMsg = async (msg: any, createdDate:Date) => {
    await axios.post(`/api/v1/messages/addMessage`, {
      from: currentUser!._id,
      to: currentChat!._id,
      message: msg,
  
      createdDate: createdDate
        });

    socket.current.emit("send-msg", {
      to: currentChat!._id,
      from: currentUser!._id,
      message: msg,
      createdDate: createdDate
    });

    const msgs:any = [...messages];
    msgs.push({ fromSelf: true, message: msg, createdDate:createdDate  });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current)
      socket.current.on("msg-recieve", (msg: any) => {

        setArrivalMessage({ fromSelf:false, message: msg , createdDate:Date() });
      });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev):any => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages]);



  useEffect(() => {
    getAllMessages();
  }, [currentChat]);
  return (
    <>
      {currentChat && (
        <div className="container4">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat?.avatarImage} alt="avatar" />
              </div>
              <div className="name">
                <h3>{currentChat.name}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message: any) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recived"
                    }`}
                  >
  
                    
                    <div className="content">
                    <div className="fromWho">
                    {`  ${message.fromSelf ? "me" : "friend"}`}
                    </div>
                    <p>{message.createdDate}</p>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInputs handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
