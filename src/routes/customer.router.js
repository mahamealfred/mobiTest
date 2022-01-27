import {  Router }  from "express";
import customerApi from '../controllers/customerController';
import isLogin from "../middleware/isLogin";
import customerValidation from "../middleware/validateCustomer";
const route=Router();


route.post('/',isLogin, customerValidation, customerApi)


export default route;