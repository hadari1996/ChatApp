import React, { useState, useEffect, useRef } from "react";
import "../Chat.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userAPI";
import { userSelector } from "../features/user/userSlice";
import Login from "./Login";
// import User from "../user";
import { User } from "../features/user/userModel";
import Friends from "../components/Friends";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

export const Chat = () => {
  // const {  } = process.env;
  // require('dotenv').config()

  const socket = React.useRef<any>(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>();
  const [friends, setFriends] = useState<User[]>([]);
  const [currentChat, setCurrentChat] = useState<User>();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getUserByCookie);
    if (user) {
      getAllFriends(user);
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getAllFriends(user);
    }
    
  }, [user]);

  const handleChangeChat = (chat: User) => {
    setCurrentChat(chat);
  };

  const getAllFriends = async (user: User) => {
    if (await user) {
      if (user.isAvatarImageSet) {
        const { data } = await axios.get(
          `/api/v1/users/allFriends/${user?._id}`
        );
        setFriends(data.friends);
        setCurrentUser(user);
        setIsLoaded(true);
      } else {
        navigate("/MyAvatar");
      }
    }
  };
  if (!user) return <Login />;
  else
    return (
      <div className="chat">
        <div className="container1">
          <Friends
            friends={friends}
            currentUser={currentUser}
            changeChat={handleChangeChat}
          />
          {
            // isLoaded && currentChat===undefined?     <Welcome currentUser={currentUser}/>:
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          }
        </div>
      </div>
    );
};

export default Chat;
