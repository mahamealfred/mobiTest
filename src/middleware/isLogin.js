import { decode } from "../helpers/jwtTokenizer";


const isLogin = async (req, res,next) => {
  const Token = req.headers["token"];
  if (!Token) {
    return res.status(403).json({
      status: 403,
      message: "please login to be Validation",
    });
  }
  const payload = await decode(Token);
  const { username } = payload;
   req.user=username;
    return next();
};

export default isLogin;