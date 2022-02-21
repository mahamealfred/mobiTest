import {  Router }  from "express";
import customerRoutes from './customer.router';
import authRoutes from './auth.routes';
import paymentRoutes from './payment.routes';
import abcRouters from './abc.router'

const route=Router();


route.use('/customer',customerRoutes);
route.use('/auth',authRoutes);
route.use('/payment',paymentRoutes)
route.use('/abc',abcRouters)


export default route;