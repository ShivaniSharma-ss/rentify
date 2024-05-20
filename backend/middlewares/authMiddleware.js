const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        message: "No Authorization token found, please login first",
      });
    }
    token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    res.status(403).json({
      success: false,
      message: "The token is expired",
    });
  }
};

module.exports = {
  auth,
};
