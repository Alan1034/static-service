/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-07-01 14:57:37
 * @LastEditTime: 2024-07-01 18:42:01
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \static-service\subsystem\auth\index.js
 *
 */
const express = require('express');
const app = express();
const router = express.Router();
const hash = require('pbkdf2-password')();
const path = require('path');
const session = require('express-session');
// middleware
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: ['shhhh, very secret 2024/7/1']
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
        res.redirect('/login');
    }
}
// app.get('/', function(req, res){
//   res.redirect('/login');
// });
app.get('/login', restrict, function (req, res) {
    res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});
app.get('/logout', function (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
        res.redirect('/');
    });
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.post('/login', function (req, res, next) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (err)
            return next(err);
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function () {
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.name
                    + ' click to <a href="/logout">logout</a>. '
                    + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('back');
            });
        }
        else {
            req.session.error = 'Authentication failed, please check your '
                + ' username and password.'
                + ' (use "tj" and "foobar")';
            res.redirect('/login');
        }
    });
});

// const auth = function (req, res, next) {
//     console.log("auth")

//     next()
// }
router.get('/login', function (req, res, next) {
    console.log(req)
    console.log(res)
    res.render('../subsystem/auth/views/login', {});
});
module.exports = router;
//# sourceMappingURL=index.js.map