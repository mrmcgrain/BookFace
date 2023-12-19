const User = require("../models/capstone.model.js")
const Messages = require("../models/messaging.model")
const Image = require("../models/image.model")
const bcrypt = require('bcrypt')
const passport = require('passport')
const path = require('path')
const fs = require("fs")
const io = require('socket.io')
const mongoose = require('mongoose')

// const jwt = require("../middleware/jwt")
// console.log("jwt", jwt.encode)

const jwt = require('jsonwebtoken')

const SECRET_KEY = 'im a little tea pot';


// const socketController = require("../socketServer")


// const socket = io.connect('http://localhost:8080')


module.exports = {

    register: (req, res) => {
        console.log("register attempt", req.body)
        User.find({ username: req.body.username })
            // .where('username')
            // .equals(req.body.username)
            .exec((err, found) => {

                if (err) console.log('register error', err)

                if (found.length) {
                    res.json({ message: "Error", Error: "Username already exists" })
                } else {

                    const hash = bcrypt.hashSync(req.body.password, 10)
                    const newUser = new User({
                        username: req.body.username,
                        password: hash,
                        location: {
                            city: req.body.location.city,
                            state: req.body.location.state,
                            zipcode: req.body.location.zipcode
                        },
                        secretQuestion: req.body.secretQuestion,
                        secretAnswer: req.body.secretAnswer,
                        gender: req.body.gender
                    })
                    User.create(newUser)
                        .then(created => {
                            // console.log("reg-user", created)
                            res.json({ message: "Success", user: created })
                        })
                        .catch(err => console.log('create user error', err))
                }
            })

        // User.findOne({ username: req.body.username })
        //     .then(doc => {
        //         if (doc) {
        //             res.json({ message: "Error", Error: "Username already exists" })
        //         } else {

        //             const hash = bcrypt.hashSync(req.body.password, 10)
        //             const newUser = new User({
        //                 username: req.body.username,
        //                 password: hash
        //             })
        //             newUser.save()
        //             res.json({ message: "Success", user: newUser })
        // console.log("reg-user", user.newUser)
        // fs.mkdir


        //     fs.mkdir(process.cwd() + `/tmp/${req.user._id}`, { recursive: true }, (err) => {
        //         if (err) {

        //             console.log("fsErr", err);
        //         } else {
        //             console.log("created dir")
        //         }
        //     });

        //     res.json({ message: "Success", user: req.user })
        //     console.log("req.user", req.user)

        // }



        // })
        // .catch(err => res.json({ message: "Error", Error: err }))
    },

    registerVerify: (req, res) => {
        // console.log("/regis/GET", req.body)
        User.find({ username: req.body.username })
            .then(user => {
                // console.log("uyser", user)
                if (user.length) {
                    res.json({ message: "User name already exsists" })
                } else {
                    res.json({ message: "valid username" })
                }
            })
    },

    login: (req, res, next) => {
        console.log("login req-body", req.body)
        /////////////////////  /// PASSPORT /////
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                // res.json({ message: "Error", Error: err })
                console.log("err", err)
            }
            if (!user) {
                res.json({ message: "Error", Error: "User Does not Exist" })
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log("login Error", err)
                    }
                    else {
                        user.isOnline = true
                        user.save()
                        req.session.userId = user._id
                        res.json({ message: "Success", user: req.user })
                        console.log("Authenticated: ", req.user.username)


                        //////////////////////////////////////////                      

                        // socketController.login

                        //////////////// PURE JWT ////////////////////
                        // User.findOne({ username: req.body.username })

                        //     .then(found => {

                        //         if (!found) {

                        //             return res.json({ "message": "InValid Login" })
                        //         } else if (!bcrypt.compare(found.password, req.body.password)) {

                        //             return res.json({ "message": "InValid Login" })

                        //         } else {

                        //             console.log("passed auth check on bcrypt")




                        //             ////JWT ATTEMPT

                        //             const payload = {
                        //             _id: found._id,
                        //             username: found.username
                        //         }
                        //         console.log("payoad", payload)

                        //         const authToken = jwt.sign(payload, SECRET_KEY)
                        //         console.log("auth jwt", authToken)
                        //         req.authToken = authToken
                        //         // req.user = found._id

                        //         res.cookie("token", authToken)
                        //         res.json({ message: "Success", user: found, token: authToken })

                        //         jwt.verify(authToken, SECRET_KEY, async (err, data) => {
                        //             console.log("VER JWT DATA", data)
                        //             console.log("VER JWT err", err)
                        //             req.bob = data
                        //             req.user = data
                        //             return next()
                        //         })
                        // then(() => {})
                        //  next()



                    }
                })
            }
        })(req, res, next)


        // passport.authenticate("local", { failureRedirect: 'http://localhost:3000/register', successRedirect: "http://localhost:3000/" })
        // (req, res, next)

    },

    loginJWT: (req, res, next) => {
        console.log("JWT login hit", req.body)
        User.findOne({ username: req.body.username })

            .then(found => {

                if (!found) {

                    return res.json({ "message": "InValid Login" })
                } else if (!bcrypt.compare(found.password, req.body.password)) {

                    return res.json({ "message": "InValid Login" })

                } else {

                    console.log("passed auth check on bcrypt")

                    ////JWT ATTEMPT

                    const payload = {
                        _id: found._id,
                        username: found.username
                    }
                    console.log("payoad", payload)

                    const authToken = jwt.sign(payload, SECRET_KEY)
                    console.log("auth jwt", authToken)
                    req.authToken = authToken
                    // req.user = found._id
                    res.cookie("token", authToken)
                    res.json({ message: "Success", user: found, token: authToken })

                }

                // jwt.verify(authToken, SECRET_KEY, async (err, data) => {
                //     console.log("VER JWT DATA", data)
                //     console.log("VER JWT err", err)
                //     req.bob = data
                //     req.user = data
                //     return next()
            })
            .catch(err => console.log("err", err))
        // then(() => {})
        //  next()
    },


    logout: (req, res) => {
        console.log(`Logging Out user ${req.user.username}`)

        /////   WORKING
        // req.logout((err) => {
        //     if (err) console.log(err)
        // })
        // res.clearCookie("connnect.sid")
        // res.send("logged out")
        /////////

        User.findByIdAndUpdate(req.user._id, { isOnline: false }, { new: true }, (err, updated) => {
            // console.log("req.user.logout", req.user)
            req.logout((err) => {
                if (err) console.log(err)
            })
            res.clearCookie("connnect.sid")
            res.clearCookie("token")
            res.send("logged out")
            console.log("LOG out 3", req.user)
        })
    },

    auth: (req, res) => { //if user loggedin, req.user is valid
        console.log("auth reqq.user", req.user)
        // console.log("auth req.bob", req.bob)
        // console.log("auth req.headers.cookie", req.headers.cookie)
        if (!req.user) {
            console.log("no req.user on axios req")
            return res.json({ message: "Error", Error: "Unable to authorize User" })
        } else {
            console.log("good req.user on axios auth rpute: req.user = ", req.user)
            // console.log("req.authToken", req.authToken)
            // console.log("req.user-auth", req.user)
            // res.json({ user: req.user })
            res.json(req.user)
        }
    },

    updatePassword: (req, res) => {
        console.log("update Passs", req.body)
        User.findById(req.user._id)
            .then(found => {
                // console.log("found", found)
                const hash = bcrypt.hashSync(req.body.password, 10)
                found.password = hash
                found.save()
            })
            .catch(err => console.log("password Change Error", err))
    },

    // passport.authenticate('local', { failureRedirect: '/', successRedirect: "/profile" })

    /////////////////////////////////////////////////////////////////s%3AC6Qv5NUT0tTc0Ocrci0S8K36xfMybpBN.qUPBVJn140bg3%2BPwWrDgG8UsxCTkI2vg4dvqPFVjqz8
    // s%3AKin0Wh3yQtRA4JYxyrXYsSytcR5dQ1Ms.GT5eodv5AFGtBKdsEjENQs2eouiaviS3wAeSH7S%2BmV4

    // http://localhost:3000/profile/64c14935cc9112daef601f53

    //after login, useeffect grabs route to here.. needs user info to fill in profile page

    /////////////    YOUR Profile //////////////////////
    profile: (req, res) => {
        console.log("PROFILE req-useer", req.user)
        // let profile = {
        //     username: req.user.username,
        //     images: {
        //         profile: "",
        //         gallery: []
        //     },

        //     friends: [],
        //     // online: req.user.isOnline
        // }

        if (!req.user) {
            res.json({ message: "login fool...profile attempt" })
        } else {


            User.findOne({ _id: req.user._id })
                /////
                .populate("gallery")
                .populate({
                    // path: "friends.userId",
                    path: "messages.userId",
                    // path: "friends.userId",
                    // select: ["_id", "profileImg", "pronoun", "friend", 'messageId']
                    select: ["_id", "profileImg", "pronoun", "friend", 'messageId', 'isOnline']
                })
                ////
                .then(found => {
                    // console.log("found", found)
                    if (!found) {
                        res.json({ message: "your not logged in fool" })
                    } else {
                        //////

                        ////

                        res.json(found)
                    }
                })
        }
        // User.findOne({ _id: req.user._id })
        //     .then(user => {
        //         console.log("user", user)
        //         // console.log("useer-online", user.isOnline)
        //         profile.online = user.isOnline
        //         user.friends.forEach((obj) => profile.friends.push({ "username": obj.userName, "userId": obj.userId, "friend": obj.friend, "isOnline": obj.isOnline }))

        //         Image.find({ userId: req.user._id })
        //             .exec()
        //             .then(images => {
        //                 if (images.length) {
        //                     if (images[0].type === "profile") {
        //                         profile.images.profile = images[0].image
        //                     }
        //                 }
        //                 res.json(profile)
        //             })

        //     })
        //     .catch(err => console.log("err", err))
    },


    //// FOR viewing other profiles

    viewProfile: (req, res) => {
        // console.log("viewing profile", req.params)

        let userProfile = {
            username: "",
            images: {
                profile: "",
                gallery: []
            }
        }

        User.findOne({ _id: req.params.id })
            .populate("gallery")

            // console.log("viewPro", req.params)
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })

        // User.findOne({ _id: req.params.id })
        //     .then(found => {
        //         // console.log("found-user", found)
        //         userProfile.username = found.username
        //         // console.log("other-user-online", found.isOnline)
        //         userProfile.online = found.isOnline
        //         // console.log("userProfile", userProfile)

        //         Image.find({ userId: found._id })
        //             .exec()
        //             .then(response => {
        //                 // let copy = Array.from(response).map((obj) => ({ ...obj, username: doc.username }))
        //                 response.map((obj) => userProfile.images.gallery.push(obj.image))
        //                 // console.log('ImageRes', response)
        //                 // console.log("userProfile", userProfile)

        //                 res.json(userProfile)

        //             })

        //             .catch(err => console.log("viewprofile error", err))

        //         // res.json({ username: doc.username })
        //     })

        // Image.find({ userId: req.params.id })
        //     .exec()
        //     .then(res)
        //     // .then(images => res.json(images))
        //     .then(images => {
        //         console.log("images", images)
        //         res.json({
        //             username: req.user,
        //             images: images
        //         })
        //     }
        //     )
        // .catch(err => console.log("err", err))






    },


    updateProfile: (req, res) => {
        // console.log("updatProfile", req.body)
        User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true })
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
    },

    updateAddress: (req, res) => {
        // console.log("updatProfile", req.body)
        User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true })
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
    },

    // imageUpload: (req, res) => {
    //     console.log("req.file", req.files)

    //     // fs.mkdir(process.cwd() + `/public/images/${req.user._id}`, { recursive: true }, (err) => {
    //     //     if (err) {

    //     //         console.log("mkdir-Err", err);
    //     //     } else {
    //     //         console.log("created dir at " + process.cwd() + `/public/images/${req.user._id}`)
    //     //         // console.log("__dir Test", __dir)
    //     //     }
    //     // })
    //     let image = req.files.image;
    //     console.log("image", image)
    //     image.mv(path.resolve(process.cwd() + `/public/images/${req.user._id}/`, image.name), async (error) => {
    //         if (error) {

    //             console.log("err.mv", error)
    //         }
    //         await Image.create({
    //             ...req.body,
    //             image: `/public/images/${req.user._id}/` + image.name,
    //             userId: req.user._id,
    //             userName: req.user.username
    //         })
    //     })
    // },

    getUsers: (req, res) => {
        console.log("searchUsers", req.params)
        User.find()
            .then(users => {
                // console.log("users", users)
                res.json(users)
            })
            .catch(err => console.log("err", err))
    },



    searchUsers: (req, res) => {
        console.log("searchUsers", req.body)
        req.body.ageLow ? null : req.body.ageLow = 18
        req.body.ageHigh ? null : req.body.ageHigh = 80
        // const {gender, ageLow, ageHigh } = req.body
        User.find({ gender: req.body.gender })
            .where("age").gt(req.body.ageLow).lt(req.body.ageHigh)
            // .exec()

            .then(users => {
                console.log("users", users)
                res.json(users)
            })
            .catch(err => console.log("err", err))
    },

    getFriends: (req, res) => {
        User.findById(req.user._id)
            .populate({
                path: "friends.userId",
                select: ["_id", "profileImg", "pronoun", "friend", 'messageId', 'isOnline']
            })
            .then(found => {
                // console.log("found", found)
                let friendArr = found.friends;
               
                res.json(friendArr)

                 })


    },

    ///// Add friend //////

    addFriend: (req, res) => {
        console.log("adding friend", req.body)

        let messageId = [req.user._id, req.body.userId].sort().join("")

        User.findById(req.user._id) // Logged In User
            .then(found => {
                console.log("Current User", found, "req.body.userId", req.body.userId)
                let filter = found.friends.filter((obj) => obj.userId.toString() === req.body.userId.toString())
                console.log("filter", filter)

                if (filter.length) {

                    if (filter[0].friend == "requested") {
                        // console.log("requested to approved")
                        filter[0].friend = "approved"
                        found.save()
                    } else if (filter[0].friend == "removed") {
                        filter[0].friend = "pending"
                        found.save()
                    } else if
                        (filter[0].friend == "approved") {
                        console.log("requested to remove")
                        filter[0].friend = "removed"
                        found.save()
                    }
                }

                User.findById(req.body.userId) // freiend to add
                    .then(userFound => { // friend to add
                        let filter2 = userFound.friends.filter((obj) => obj.userId.toString() === req.user._id.toString())
                        // console.log("filter2", filter2)
                        if (filter2.length) {

                            if (filter2[0].friend === "pending") {
                                // console.log("pending to approved")
                                filter2[0].friend = "approved"
                                userFound.save()
                                // filter2.save()
                                // socket.emit("addFriend", userFound._id)
                            } else if (filter2[0].friend === "removed") {
                                filter2[0].friend = 'requested'
                                userFound.save()
                            } else
                                if (filter2[0].friend === "approved") {
                                    // console.log("pending to approved")
                                    filter2[0].friend = "removed"
                                    userFound.save()
                                    // filter2.save()
                                    // socket.emit("addFriend", userFound._id)
                                }


                            // } else {
                        } else if (found.friends.filter((obj) => obj.userId !== userFound._id)) {
                            //  let adding = userFound.filter((obj) => obj.userId === req.user._id)

                            // } else if(found.friends.filter((obj) => obj.userId !== userFound._id){


                            // if FOUND has friend userFound and friend === pending, change ot approved....

                            found.friends.push({
                                userName: userFound.username,
                                userId: userFound._id,
                                messageId: messageId,
                                friend: "pending",
                                created: new Date()
                            })
                            // console.log("useerFound-2nd add friend", userFound)
                            // console.log("req friends add", req.user)
                            userFound.friends.push({
                                userName: req.user.username,
                                userId: req.user._id,
                                messageId: messageId,
                                friend: "requested",
                                created: new Date()
                            })
                            userFound.save()
                            found.save()
                                .then(added => {
                                    // console.log("Updated User", added, "found", found)
                                    // res.json(added)
                                }
                                )
                                .catch(err => console.log("Error adding friend", err))
                        }
                    })
            })
    },

}