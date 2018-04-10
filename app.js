/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const router = require('express').Router();

dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */

const authController = require('./controllers/auth');
const persController = require('./controllers/person');
// const survController = require('./controllers/survey');
/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', err => {
  console.error(err);
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗')
  );
  process.exit();
});

db.once('open', () => {
  console.log('Mongoose connection successful.');
});
/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */

// HOMECHECKER:
app.post('/api/auth', authController.login);
app.post('/api/user', authController.register);

// PERSON
// app.get('/api/person', persController.findAll);
// app.get('/api/person', persController.findById);
router
  .route('/api/person')
  .get(persController.findAll)
  .post(persController.create);

router
  .route('/api/person/:id')
  .get(persController.findById)
  .put(persController.update)
  .delete(persController.remove);

/*
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
app.use('/', router);
module.exports = app;
