const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connections');
const exphbs = require('express-handlebars'); 
//requiring the npm package for the express-handlebars
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Secrets',
  cookie: {path: '/'},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

var distDir = __dirname + "/dist/";

app.use(express.static(distDir));

if (app.get("env") === "production") {
  // Serving secure cookies and also requires HTTPS
  sess.cookie.secure = true; 
  sess.proxy = true
  app.set('trust proxy', 1)
}

app.use(session(sess));
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// use of the routes
app.use(routes);

// connection to the db and  the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});