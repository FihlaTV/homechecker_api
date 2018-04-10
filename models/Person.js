const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    stateProvence: String,
    city: String,
    postalCode: String,
    email: String,
    mobile: String,
    role: String
  },
  {
    collection: "Persons"
  }
);

const Person = mongoose.model("Persons", personSchema);
module.exports = Person;
