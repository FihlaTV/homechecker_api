const Person = require('../models/Person.js');

module.exports.register = (req, res) => {
  const filter = {
    firstName: req.body.firstName,
    lastame: req.body.lastName
  };
  Person.findOne(filter, (err, pers) => {
    if (pers) {
      return res.status(500).send(' status: Error: duplicate entry.');
    }
    Person.create(req.body, (err, result) => {
      console.log(result);
      if (err) return err;
      return res.status(200).send(result);
    });
  });
};
module.exports.getall = (req, res) => {
  Person.find({}).then(console.log(res));
};
module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
