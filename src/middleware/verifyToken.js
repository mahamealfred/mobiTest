import { decode } from "../helpers/jwtTokenizer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken=async(req, res, next)=>{
const token=req.headers['token']
//const token=authHeader && authHeader.split('')[1]

if(token==null) return res.sendStatus(401)
jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
    if(err) return res.sendStatus(403)
    req.user=user
    next()
})

}

export default verifyToken;