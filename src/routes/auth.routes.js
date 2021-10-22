import {  Router }  from "express";
import authControler from "../controllers/authController";
const route=Router();


route.post('/',authControler.auth)


export default route;