const db = require('../models/');

module.exports = {
  findAll: function(req, res) {
    db.Person.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Person.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Person.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Person.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Person.findById(req.params.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

// const person = {
//   firstName: req.body.firstName,
//   lastName: req.body.lastName,
//   address: req.body.address,
//   stateProvence: req.body.stateProvence,
//   city: req.body.city,
//   postalCode: req.body.stateProvence,
//   email: req.body.email,
//   mobile: req.body.mobile,
//   role: req.body.role
// };
