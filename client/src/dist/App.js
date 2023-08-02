"use strict";
exports.__esModule = true;
exports.SERVER_URL = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./App.scss");
var Register_1 = require("./views/Register");
var Login_1 = require("./views/Login");
var MyAvatar_1 = require("./views/MyAvatar");
var Chat_1 = require("./views/Chat");
var react_redux_1 = require("react-redux");
var store_1 = require("./app/store");
var Page404_1 = require("./views/Page404");
var NODE_ENV = "PROD";
exports.SERVER_URL = "";
if (NODE_ENV === "PROD") {
    exports.SERVER_URL = "https://chatapp-server-iq5u.onrender.com";
}
else {
    exports.SERVER_URL = "http://localhost:4000";
}
// export const SERVER_URL = `https://chatapp-server-iq5u.onrender.com`;
function App() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_redux_1.Provider, { store: store_1.store },
            react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "Register", element: react_1["default"].createElement(Register_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Login_1.Login, null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "MyAvatar", element: react_1["default"].createElement(MyAvatar_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "Chat", element: react_1["default"].createElement(Chat_1.Chat, null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: react_1["default"].createElement(Page404_1["default"], null) }))))));
}
exports["default"] = App;
