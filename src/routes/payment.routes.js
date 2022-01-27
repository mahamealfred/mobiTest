import {  Router }  from "express";
import paymentControler from "../controllers/paymentController";
import isLogin from "../middleware/isLogin";
const route=Router();


route.post('/',isLogin, paymentControler.payement)


export default route;