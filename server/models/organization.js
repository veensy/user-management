const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String }
});

module.exports = mongoose.model("Organization", organizationSchema);
