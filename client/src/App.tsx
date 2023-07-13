import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Register from "./views/Register";
import { Login } from "./views/Login";
import MyAvatar from "./views/MyAvatar";
import { Chat } from "./views/Chat";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserByCookie } from "./features/user/userAPI";
// import Friends from './components/Friends';

import { userSelector } from "./features/user/userSlice";
import Page404 from "./views/Page404";
function App() {

  return (
    <>
    
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            <Route path="Register" element={<Register />} />
            <Route  path="/" element={<Login  />} />
            <Route path="MyAvatar" element={<MyAvatar />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
