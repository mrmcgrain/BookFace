const  User  = require("../models/capstone.model")
const bcrypt = require('bcrypt')
const LocalStrategy = require("passport-local").Strategy;

//Most of this config, is like out reminders.config == template that doesnt change much when u create different apps w/ users
//this is what handles most of the passport logic of logging in, and reading/writing cookies to auth users.

module.exports = function (passport) {

    // This localStrat is what gets ran when we login - and use passport.authenticate. - you may have to modify this slightly if youre using email to login or something

    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, foundUser) => {
                if (err) {
                    return done(null, err)
                }
                if (!foundUser) {
                    return done(null, false)
                }
                if (!bcrypt.compareSync(password, foundUser.password)) {
                    return done(null, false)
                }
                return done(null, foundUser)
            })
        })
    )

    // serialize user - middleware of controller methods - create a user cookie - store it in the users browser for auth later... 

    // passport.serializeUser((user, done) => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //deserialize user - middleware of controller methods - take a user cookie... read it - return the data

    passport.deserializeUser((_id, done) => {
        User.findOne({ _id: _id }, (err, aUser) => {
            // Note we could return the whole 'aUser' here - but that would be the full user document from Mongo on EVERY Auth check.
            // it makes more sense/security to only return the data that would be useful to pull from a cookie ( username & mongo _id)
            const cookie = {
                username: aUser.username,
                _id: aUser._id,
                wtf: "23"
            }
            done(err, cookie)
        })
    })

}
