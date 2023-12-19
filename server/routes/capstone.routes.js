const Controller = require("../controllers/capstone.controller")
const MessageController = require("../controllers/message.controller")
const imageController = require("../controllers/image.controller")
const FeedController = require("../controllers/feed.controller")
const {encode, decode, verify } = require("../middleware/jwt")

module.exports = app => {
    app.post('/user/register', Controller.register)
    app.post('/user/register/verify', Controller.registerVerify)
    // app.post('/user/register', Controller.register)
    app.post('/user/login',  Controller.login)
    app.post('/user/loginJWT',  Controller.loginJWT)
    app.get('/user/auth',  Controller.auth)
    // app.delete("/user/logout", Controller.logout)
    app.put("/user/logout", Controller.logout)
    app.post("/user/updatePassword", Controller.updatePassword)
    app.post("/user/updateAddress", Controller.updateAddress)


    // on login, redir to profile page - useEffect axios to this route to get user info to fill in user profile page
    app.get("/profile",  Controller.profile)
    app.post("/api/updateProfile", Controller.updateProfile)
    app.post("/api/updateAddress", Controller.updateAddress)

    //image server stuff
    app.post("/imageUpload/profile", imageController.profileUpload)
    // app.post("/imageUpload/feed", imageController.feedUpload)
    app.post("/imageUpload/gallery", imageController.galleryUpload)
    app.get("/imageUpload/profile/render", imageController.profileUploadRender)
    // app.post("/imageUpload/gallery", imageController.galleryUpload)
    // app.get("/api/users/gallery/:img", imageController.galleryImg)
    
    app.get('/api/users/getgallery/:id', imageController.getGallery)

    app.get("/api/users/gallery/:img", imageController.galleryImg)

    app.post("/api/users/gallery/addLike/:img", imageController.galleryImgAddLike)

    
    app.post("/api/users/gallery/addComment/", imageController.galleryImgAddComment)
    
    // app.post("/api/users/gallery/addLike/comment/", imageController.galleryImgCommentAddLike)

    app.post("/api/users/gallery/addCommentComment/", imageController.galleryImgAddCommentComment)

    app.put("/api/users/gallery/addTag", imageController.galleryAddTag)

    app.delete("/api/users/gallery/removeImage", imageController.galleryRemoveImage)

    // app.put('/users/profile/image/delete', imageController.imageDelete)
    
    /// Search Users
    // app.get("/api/searchUsers/:gender/:ageHigh/:ageLow", Controller.searchUsers)
    app.post("/api/searchUsers/", Controller.searchUsers)
    app.get("/api/getFriends/", Controller.getFriends)
    
    //// USER query RightBody
    
    app.get("/api/getusers", Controller.getUsers)
    
    /// FOR lookingup other users profiles
    
    app.get("/users/profile/:id",  Controller.viewProfile)

    //////////////////////
    // Messageing Stuff
    //////////////////////

    app.post("/api/addMessage", MessageController.addMessage)
    app.get("/api/getAllMessages",    MessageController.getAllMessages)
    app.post("/api/getThreadMessages",  MessageController.getThreadMessages)
    app.put(`/api/messages/deleteall/:id`,  MessageController.deleteAllMessages)


    //////////////////////
    // Feed Stuff
    //////////////////////

    app.post("/api/addFeed", FeedController.addFeed)
    app.get("/api/getFeeds", FeedController.getFeeds)
    app.get("/api/getMyFeeds", FeedController.getMyFeeds)
    app.get("/api/getFollowingFeeds", FeedController.getFollowingFeeds)
    app.post("/api/addComment", FeedController.addComment)
    app.post("/api/addCommentComment", FeedController.addCommentComment)
    app.post("/api/addLike", FeedController.addLike)
    app.put("/api/addFollow", FeedController.addFollow)
    app.delete("/api/removeFollow/:id", FeedController.removeFollow)
    app.post("/api/removeNotice", FeedController.removeNotice)
    app.get('/api/feed/search/:data', FeedController.searchFeed)

// for notification links to comment....and feed maybe?

    app.get("/api/notification/comment/:id", FeedController.findComment)
    app.get("/api/notification/feed/:id", FeedController.findFeed)

    app.get("/api/deepFind/:id", FeedController.findComment)



    //////////////////////
    // Friend Stuff
    //////////////////////

    app.post("/api/users/addFriend", Controller.addFriend)
    // app.delete("/api/users/removeFriend/:id", Controller.removeFriend)

    // app.post("/imageUpload/profile", imageController.profileUpload)


    app.get("/test", (req, res) => {
        console.log("req", req)
        console.log("req-header", req.headers)
        console.log("req-user", req.user)
    })

    

    // console.log("req.file", req.files)
    // let image = req.files.image;
    // console.log("image", image)
    // image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) =>{

    //     await User.create({
    //         ...req.body,
    //         image: "/img/" + image.name
    //     }) 
    // })



    // app.use(upload({
    //     limits: { fileSize: 50 * 1024 * 1024 },
    // }));


    // app.get("/pull/:name", (req, res) => {
    //     let requested = process.cwd() + `/images/${req.params.name}`;
    //     if (fs.existsSync(requested)) {
    //         res.sendFile(requested)
    //     } else {
    //         res.send({ error: "No such file exists" })
    //         console.log(fs.existsSync(requested, (err) => console.log(err)))
    //     }

    // })

    // app.post("/upload", (req, res) => {
    //     console.log("req", req.files)
    //     if (!req.files || Object.keys(req.files).length === 0) {
    //         return res.status(400).send('No files were uploaded.');
    //     }

    //     let sampleFile = req.files.sampleFile;
    //     sampleFile.mv(process.cwd() + `/images/${sampleFile.name}`, (err) => {
    //         if (err) {
    //             return res.status(400).send(err)
    //         }
    //         // .then(succcess => console.log("scucess", success))
    //         res.send("File Uploaded!")
    //     })

    // })
}