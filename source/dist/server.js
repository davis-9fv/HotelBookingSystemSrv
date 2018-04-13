"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const user_model_1 = require("./models/user.model");
var dbUrl = 'mongodb://user_db:mongodbpassword@ds241869.mlab.com:41869/hotel_booking_system_db';
var app = express();
app.set('dbUrl', dbUrl);
mongoose.connect(dbUrl);
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(cookieParser());
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use('login', new LocalStrategy.Strategy((username, password, done) => {
    user_model_1.User.findOne({ username: username }, (err, temp_user) => {
        if (err) {
            return done(err);
        }
        if (!temp_user) {
            return done(null, false);
        }
        temp_user.comparePassword(password, (err, isMatch) => {
            if (err)
                throw err;
        });
        return done(null, temp_user);
    });
}));
app.use(expressSession({ secret: 'thegreatandsecretshow' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/rest/user', require('./routes/user.route')(passport, express.Router()));
app.use('/rest/hotel', require('./routes/hotel.route')(passport, express.Router()));
app.listen(5000, () => {
    console.log('The server is running');
});
