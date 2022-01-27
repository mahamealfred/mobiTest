import {  Router }  from "express";
import authControler from "../controllers/authController";
import authenticationControler from "../controllers/authenticationController";
const route=Router();


route.post('/',authControler.auth)
route.post('/user',authenticationControler.auth)


export default route;