import React, { useEffect, useState } from "react";

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userAPI";
import { userSelector } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.svg";
import "../Friends.scss";
import { User } from "../features/user/userModel";

interface FriendsProps {
  friends: User;
  currentUser: User;
  changeChat: User;
}

export const Friends: FC<FriendsProps> | any = ({
  friends,
  currentUser,
  changeChat,
}: {
  friends: User[];
  currentUser: User;
  changeChat: any;
}) => {
  const AvatarsApi = "https://api.dicebear.com/6.x/lorelei/png?seed=1  ";
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImg, setCurrentUserImg] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserByCookie);
    getCurrentUser(user);
  }, []);

  const getCurrentUser = async (user: User|any) => {
    if (await user) {
      setCurrentUserImg(user.avatarImage);
      setCurrentUserName(user.name);
    }
  };

  const changeCurrentChat = (index: string, friend: User) => {
    setCurrentSelected(index);
    changeChat(friend);
  };
  return (
    <>
      {currentUserName && currentUserImg && (
        <div className="container2">
          <div className="wrapper2">
            <div className="wrapper3">
            <h3>Chat-APP</h3>
            <div className="current-user">
              <div className="avatar">
    
          <img src={currentUserImg} alt="avatar" /> 
  
                <div className="name">
                  <h1> {user?.name}</h1>
                </div>
              </div>
            </div>
            </div>

            <div className="friends">
              {friends &&
                friends.map &&
                friends.map((friend: User, index:any) => {
                  return (
                    <div
                      className={`friend ${
                        index == currentSelected ? "selected" : ""
                      }`}
                      key={index}
                      onClick={(event) => changeCurrentChat(index, friend)}
                    >
                      <div className="avatar">
                       
                        { (friend?.avatarImage) ? <img src={friend?.avatarImage} alt="avatar" />:
                     <img src={`${AvatarsApi}/${Math.round(Math.random() * 5000)}`} alt="avatar" />
                  
              }


                      </div>
                      <div className="name">
                        <h2>{friend.name}</h2>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Friends;
