const Profile = require("../models/Profile.js");

module.exports.login = (req, res, next) => {
  const filter = { username: req.body.username };
  Profile.findOne(filter, (err, prof) => {
    console.log(prof);
    if (!prof || prof.password !== req.body.password) {
      return res.send(401, { status: "Not authorized." });
    }
    return res.send(200, { status: "You have successfully logged in." });
  });
};

module.exports.register = (req, res, next) => {
  const filter = { username: req.body.username };
  Profile.findOne(filter, (err, prof) => {
    if (prof) return res.send(500, { status: "Cannot register user." });
    Profile.create(req.body, (err, result) => {
      return res.send(200, result);
    });
  });
};
