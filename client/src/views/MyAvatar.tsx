import React, { useState, useEffect, MouseEventHandler } from "react";
import styled from "styled-components";
import "../App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "./../features/user/userAPI";
import Login from "./Login";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>;



export default function MyAvatar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getUserByCookie);
  }, []);


  const AvatarsApi = "https://api.dicebear.com/6.x/lorelei/png?seed=1  ";

  const navigate = useNavigate();
  if (!user) navigate("/login");
  const [Loading, setLoading] = useState(true);
  const [theAvatar, setTheAvatar] = useState(Number);

  const createPic = () => {
    return `${AvatarsApi}/${Math.round(Math.random() * 5000)}`;
  };

  const [avatarArray, setAvaterAarry] = useState<string[]>([
    createPic(),
    createPic(),
    createPic(),
    createPic(),
  ]);

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfileAvatar = async () => {
    if (theAvatar === undefined) {
      toast.error("please select an avatar", toastOptions);
    } else {
      const { data } = await axios.post(`/api/v1/users/MyAvatar/`, {
        userId: user?._id,
        img: avatarArray[theAvatar],
      });

       const {avatarIsSet}=data;
      if (avatarIsSet===true) {
        navigate("/");
      
      } else toast.error("Error is occured, please select an avatar again");
    }
  };
  const avatarsImges = async () => {
    try {
      for (let i = 0; i < 4; i++) {
        const { data } = await axios.get(
          `${AvatarsApi}/${Math.round(Math.random() * 5000)}.png`
        );
        if (!data) throw new Error("cannot get Avatar in DATA");
      }

      setLoading(false);
    } catch (error:any) {
      console.error(error.message);
    }
  };
  if (!user) return <Login />;
  else
    return (
      <>
        {
          // Loading ? <div className="container">
          // <img src="{https://icon-library.com/images/loader-icon/loader-icon-18.jpg}" alt="loader" className="loader"/>
          // <div/> :

          <div className="container">
            <div className="header-contianer">
              <h1>Choose your pic to profile</h1>
            </div>
            <div className="avatars">
              {avatarArray.map((image, idx) => {
                return (
                  <div
                    className={`avatar ${theAvatar == idx ? "selected" : ""}`}
                  >
                    <img
                      src={image}
                      alt=""
                      id={`${idx}`}
                      onClick={(ev : React.MouseEvent<HTMLImageElement>|any) => {
                        setTheAvatar(ev.target.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <button className="submit-btn" onClick={setProfileAvatar}>
              This is my Avatar
            </button>
          </div>
        }
        <ToastContainer />
      </>
    );
}
