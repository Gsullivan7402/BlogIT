const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import sequelize connection
const sequelize = require('./config/config.js');

// Import routes
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session with Sequelize store
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 30 * 60 * 1000 }, // Example: 30-minute cookie lifetime
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

// Use the routes
app.use(routes);

// Start the server and sync the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});