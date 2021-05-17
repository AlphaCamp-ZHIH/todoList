const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const usePassport = require('./config/passport');
const rotues = require('./routes/index');
require('./config/mongoose');


const app = express();
const port = process.env.PORT || 3000;

//session and passport
app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
usePassport();

//bodyparser and methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//template
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.user = req.user;
  next();
});

app.use(rotues);

app.listen(port, () => {
  console.log(`operate server port:${port} successfully`)
})