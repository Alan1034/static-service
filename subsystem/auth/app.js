'use strict';
/**
 * Module dependencies.
 */
const express = require('express');
const hash = require('pbkdf2-password')();
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const authIndex = require('./routes/index');
const app = module.exports = express();
// config
app.engine('html', ejs.__express);
//启动视图引擎
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));
// Session-persisted message middleware
app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err)
        res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg)
        res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});
// dummy database
var users = {
    tj: { name: 'tj' }
};
// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
hash({ password: 'foobar' }, function (err, pass, salt, hash) {
    if (err)
        throw err;
    // store the salt & hash in the "db"
    users.tj.salt = salt;
    users.tj.hash = hash;
});
// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    if (!module.parent)
        console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user)
        return fn(null, null);
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err)
            return fn(err);
        if (hash === user.hash)
            return fn(null, user);
        fn(null, null);
    });
}
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        req.session.error = 'Access denied!';
        // res.redirect('/login');
    }
}
app.use('/', authIndex);
//# sourceMappingURL=app.js.map