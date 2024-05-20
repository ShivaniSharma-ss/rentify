const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  place: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  BHK: { type: Number, required: true },
  noOfBathrooms: { type: String, required: true },
  nearbyPlaces: { type: String, required: true },
  preferredTenant: { type: String, required: true },
  securityDeposit: { type: Number, required: true },
  houseRent: { type: Number, required: true },
  furnishing: { type: String, required: true },
  userEmail: { type: String, required: true },
});

module.exports = mongoose.model("Properties", propertiesSchema);
