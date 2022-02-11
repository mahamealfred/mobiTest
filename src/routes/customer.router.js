import {  Router }  from "express";
import customerApi from '../controllers/customerController';
import isLogin from "../middleware/isLogin";
import customerValidation from "../middleware/validateCustomer";
import verifyToken from "../middleware/verifyToken";
const route=Router();


route.post('/', isLogin,verifyToken, customerValidation, customerApi)


export default route;