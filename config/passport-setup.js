const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const mongoose = require('mongoose')
//model
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    //already have the user
                } else {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    }).save().then((newUser) => {
                        console.log("new user created: " + newUser);
                    })
                }
            })

        }
    )
);