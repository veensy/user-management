const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  name: { type: String },
  organizationId: { type: String },
  teamId: { type: String }
});

module.exports = mongoose.model("User", userSchema);
