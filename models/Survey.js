const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String
  },
  {
    collection: 'Surveys'
  }
);

const Survey = mongoose.model('Surveys', surveySchema);
module.exports = Survey;
