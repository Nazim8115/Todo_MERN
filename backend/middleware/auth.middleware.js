import jwt from "jsonwebtoken";
import "dotenv/config";
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  let accessToken = token.substring(7);
  accessToken = accessToken.replace(/^"(.*)"$/, "$1");

  if (!token) {
    return res.status(403).send("A token is required for Authentidaction! ");
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
