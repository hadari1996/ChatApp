import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import "../App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "../features/user/userAPI";

export const FormContainer: any = styled.div`width:100vw; height: 100vh; display: flex; justify-content: center; align-items-center`;

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getUserByCookie);
  }, []);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  if (user) navigate("/");

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { password, confirmPassword, name, email } = values;
        const { data } = await axios.post(`/api/v1/users/register`, {
          password,
          confirmPassword,
          name,
          email,
        });

        navigate("/MyAvatar");
      }
    } catch (error: any) {
      console.error(error.message);

      toast.error(error.response.data.error, toastOptions);
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password != confirmPassword) {
      toast.error(
        "Passoword and confirm password should be same.",
        toastOptions
      );

      return false;
    } else if (name.length < 3) {
      toast.error("User should be greater than 3 characters.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="FormContainer">
      <form onSubmit={(ev) => handleOnSubmit(ev)}>
        <div className="brand">
          <img src={Logo} alt="logo" style={{ width: "100px" }} />
        </div>
        <input
          type="name"
          placeholder="Name"
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />

        <button type="submit"> Create User</button>
        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
      </form>
      <ToastContainer />

    </div>
  );
};

export default Register;
