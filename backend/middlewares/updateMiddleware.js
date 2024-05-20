const Users = require("../models/user.model");
const update = async (req, res, next) => {
  if (
    req.body.firstName?.length < 2 ||
    req.body.lastName?.length < 2 ||
    req.body.email?.length < 7 ||
    req.body.phoneNumber?.length != 10 ||
    req.body.password?.length < 8
  ) {
    res.status(400).json({
      success: false,
      message:
        "Name length should be grater than 1, email length should be greater than 6, phone length should be equal to 10, password length should be greater than 7, privacy is required, isAdmin is required.",
    });
  } else {
    next();
  }
};

module.exports = {
  update,
};
