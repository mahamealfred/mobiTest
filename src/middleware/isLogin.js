import { decode } from "../helpers/jwtTokenizer";

const isLogin = async (req, res, next) => {
  const Token = req.headers["token"];

  if (Token == null) {
    return res.status(401).json({
      status: 401,
      message: "Please not authorize login",
    });
  }
    const payload = await decode(Token);
    const { username } = payload;
    req.user = username;
    return next();
  }

export default isLogin;
