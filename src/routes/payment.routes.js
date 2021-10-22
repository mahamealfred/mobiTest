import {  Router }  from "express";
import paymentControler from "../controllers/paymentController";
const route=Router();


route.post('/',paymentControler.payement)


export default route;