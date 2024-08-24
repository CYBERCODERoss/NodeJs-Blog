// api/index.js

require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('../server/config/db');
const { isActiveRoute } = require('../server/helpers/routeHelpers');

const app = express();

// Connect to DB
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'a very secret key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    collectionName: 'sessions'
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 14 // 14 days
  }
}));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.locals.isActiveRoute = isActiveRoute; 

app.use('/', require('../server/routes/main'));
app.use('/', require('../server/routes/admin'));

// Export the Express app
module.exports = app;
