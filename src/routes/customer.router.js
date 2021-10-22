import {  Router }  from "express";
import callExternalApiUsingHttp from '../controllers/customerController';
import customerValidation from "../middleware/validateCustomer";
const route=Router();


route.post('/',customerValidation,callExternalApiUsingHttp)


export default route;