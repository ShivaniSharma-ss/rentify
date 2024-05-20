const Users = require("../models/user.model");
const register = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email }).lean();
    if (user) {
      res.status(400).json({
        success: false,
        message: "User with this email has already been registered",
      });
    } else {
      req.body.password = new Buffer(req.body.password).toString("base64");
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  register,
};
