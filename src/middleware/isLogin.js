import { decode } from "../helpers/jwtTokenizer";


const isLogin = async (req, res,next) => {
  const Token = req.headers["token"];
  if (!Token) {
  
    return res.status(401).json({
      status: 401,
      message: "Please login",
    });
  }
  const payload = await decode(Token);
  const { username } = payload;
   req.user=username;
    return next();
};

export default isLogin;