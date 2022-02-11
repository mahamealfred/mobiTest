import {  Router }  from "express";
import paymentControler from "../controllers/paymentController";
import isLogin from "../middleware/isLogin";
import verifyToken from "../middleware/verifyToken";
import paymentValidation from "../middleware/ValidatePayment";
const route=Router();


route.post('/',paymentValidation, isLogin,verifyToken,  paymentControler.payement)


export default route;