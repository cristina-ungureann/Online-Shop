const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session');

function createSessionStore(session) {
    const MongoDbStore = mongoDbStore(expressSession);

    const store = new MongoDbStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    })
    return store;
}

function createSessionConfig() {
    return {
      secret: 'super-secret',
      resave: false,
      saveUninitialized: false,
      store: createSessionStore(),
      cookie: {
        maxAge: 2 * 24 * 60 * 1000 // the browse keeps you logged in for 2 days, if you don t set this, you ll be logged out whenever you exit the brouwse
      }
    };
}

module.exports = createSessionConfig