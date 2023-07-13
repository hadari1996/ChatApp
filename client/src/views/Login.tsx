import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import "../App.scss";
import { toast, ToastContainer } from "react-toastify";
import { userSelector } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getUserByCookie } from "../features/user/userAPI";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);
  if (user) navigate("/chat");

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { password, name } = values;
        const { data } = await axios.post(`/api/v1/users/login`, {
          password,
          name,
        });

        const { status, userLogin } = data;
        if (status) {
          navigate("/MyAvatar");
        }
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response.data.error, toastOptions);
    }
  };

  const handleValidation = () => {
    const { password, name } = values;
    if (name === "") {
      toast.error("Please enter user name and password", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Please enter user name and password", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="FormContainer">
        <form onSubmit={(ev) => handleOnSubmit(ev)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="name"
            placeholder="Name"
            name="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />

          <button type="submit"> Login</button>
          <span>
            Don't have an accout? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
