const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String
  },
  {
    collection: "Profiles"
  }
);

const Profile = mongoose.model("Profiles", profileSchema);
module.exports = Profile;
