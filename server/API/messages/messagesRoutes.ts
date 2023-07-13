import express from "express";
import { addMessage, getAllMessage } from "./messagesCtrl";
import { } from "./messagesModel";


const router=express.Router();


router
.post('/addMessage', addMessage)
.post('/getAllMessage', getAllMessage)


export default router;