import abcController from "../controllers/abcController/abcController";
import {Router} from 'express';


const route=Router();

route.get('/getAll',abcController.getAllabc)

export default route;