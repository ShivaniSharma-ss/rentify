const bodyParser = require("body-parser");
const Users = require("./models/user.model");
const Properties = require("./models/properties.model");
dotenv = require("dotenv");
const express = require("express");

dotenv.config();
var jsonParser = bodyParser.json();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const registerMiddleware = require("./middlewares/registerMiddleware");
const loginMiddleware = require("./middlewares/loginMiddleware");
const updateMiddleware = require("./middlewares/updateMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
app.use(router);

router.post(
  "/addUser",
  jsonParser,
  registerMiddleware.register,
  async (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        profileType: req.body.profileType,
      };

      const resp = await Users.insertMany(user);
      console.log(resp);
      res.status(200).json({
        success: true,
        message: "User has been added successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

router.post("/login", jsonParser, loginMiddleware.login, async (req, res) => {
  try {
    let token = jwt.sign(req.user, accessTokenSecret, { expiresIn: "1h" });
    res.status(200).json({
      success: true,
      message: "User has been successfully logged in",
      token: token,
      userDetails: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
});

router.get(
  "/getSellerDetails",
  authMiddleware.auth,
  jsonParser,
  async (req, res) => {
    try {
      const user = await Users.findOne({ email: req.query.email }).lean();
      if (user) {
        delete user.password;
        delete user._id;
        delete user.__v;
        res.status(200).json({
          success: true,
          userDetails: {
            ...user,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

// *********************Properties APIS*******************************

router.post("/addProperties", jsonParser, async (req, res) => {
  try {
    const property = {
      place: req.body.place,
      title: req.body.title,
      area: req.body.area,
      address: req.body.address,
      BHK: req.body.BHK,
      noOfBathrooms: req.body.noOfBathrooms,
      nearbyPlaces: req.body.nearbyPlaces,
      preferredTenant: req.body.preferredTenant,
      securityDeposit: req.body.securityDeposit,
      houseRent: req.body.houseRent,
      furnishing: req.body.furnishing,
      userEmail: req.body.userEmail,
    };

    const resp = await Properties.insertMany(property);
    console.log(resp);
    res.status(200).json({
      success: true,
      message: "Property has been added successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      e,
    });
  }
});

router.get(
  "/getAllProperties",

  jsonParser,
  async (req, res) => {
    try {
      const properties = await Properties.find().lean();
      if (properties) {
        delete properties._id;
        delete properties.__v;
        res.status(200).json({
          success: true,

          properties,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Property Not Found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

router.post(
  "/getMyProperties",
  authMiddleware.auth,
  jsonParser,
  async (req, res) => {
    try {
      const email = req.body.email;
      const properties = await Properties.find({ userEmail: email }).lean();
      if (properties) {
        delete properties._id;
        delete properties.__v;
        res.status(200).json({
          success: true,
          properties,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Property Not Found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

router.put(
  "/updateProperty",
  jsonParser,
  authMiddleware.auth,
  async (req, res) => {
    try {
      const property = {
        place: req.body.place,
        title: req.body.title,
        area: req.body.area,
        address: req.body.address,
        BHK: req.body.BHK,
        noOfBathrooms: req.body.noOfBathrooms,
        nearbyPlaces: req.body.nearbyPlaces,
        preferredTenant: req.body.preferredTenant,
        securityDeposit: req.body.securityDeposit,
        houseRent: req.body.houseRent,
        furnishing: req.body.furnishing,
        userEmail: req.body.userEmail,
      };
      await Properties.updateOne(
        { userEmail: req.body.userEmail },
        { $set: property }
      );
      res.status(200).json({
        success: true,
        message: "Property is updated successfully",
        newDetails: {
          ...property,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

router.delete(
  "/deleteProperty",
  jsonParser,
  authMiddleware.auth,
  async (req, res) => {
    try {
      await Properties.deleteOne({ userEmail: req.body.userEmail });
      res.status(200).json({
        success: true,
        message: "Property is deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

module.exports = router;
