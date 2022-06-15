const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.status(401).send("Access Denied.");

  try {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const verified = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
