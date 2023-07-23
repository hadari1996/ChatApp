import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./userModel";

export const getUserByCookie = createAsyncThunk(
  "get-user-by-cookie",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        `/api/v1/users/get-user-by-cookie/${sessionStorage.getItem("userID")}`,
        { withCredentials: true }
      );
      // const {data}= await axios.get(`/api/v1/users/get-user-by-cookie`);
      if (!data)
        throw new Error(
          "Couldn't receive data from axios GET '/get-user-by-cookie' from: userAPI "
        );
      const { userDB } = data;
      return userDB;
    } catch (error: any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);
