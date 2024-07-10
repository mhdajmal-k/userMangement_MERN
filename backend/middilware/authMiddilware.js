import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token, "this is token");
  if (token) {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken);
    if (!verifyToken) return res.status(401).json({ error: "UnAuthorized" });
    req.userId = verifyToken.id;
    console.log("in auth last");
    next();
  } else {
    return res.status(401).json({ error: "authorization denied" });
  }
};

export const adminAuth = (req, res, next) => {
  console.log(req.cookies.token,"first token")
  const token = req.cookies.token;
  console.log(token,":is the token")
  if (!token)
    return res.status(401).json({ error: "invalid token need to login" });
  if (token) {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) return res.status(402).json({ error: "unAuthorized" });
    req.adminId=verifyToken.id
    next();
  } else {
    return res.status(401).json({ error: "authorization denied" });
  }
};
