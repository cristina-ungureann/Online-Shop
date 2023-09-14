const path = require('path');


const addCsrfTokenMiddleware = require('./middlewares/csrf-token');

const csrf = require('csurf');

const express = require('express');

const db = require('./data/database');

const errorHandlerMiddleware = require('./middlewares/error-handler');

const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
// const checkAuthStatus = require('./middlewares/check-auth');
const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const prodRoutes = require('./routes/products.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig))
app.use(csrf());

app.use(addCsrfTokenMiddleware);

// app.use(checkAuthStatus);

app.use(baseRoutes);
app.use(authRoutes);
app.use(prodRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function(){
    app.listen(3000);
    console.log('Started running on port 3000');
  })
  .catch(function(error){
    console.error('Failed to connect to the database:', error);
  });


