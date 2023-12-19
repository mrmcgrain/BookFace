const path = require('path')
const fs = require("fs")
const { Image, Gallery, ImageComment } = require("../models/image.model")
const User = require("../models/capstone.model.js")

module.exports = {

    profileUpload: (req, res) => {
        console.log("images-req.user", req.user)
        console.log("req.file", req.files)
        console.log("req", req.body)

        // fs.mkdir(process.cwd() + `/public/images/${req.user._id}`, { recursive: true }, (err) => {
        //     if (err) {

        //         console.log("mkdir-Err", err);
        //     } else {
        //         console.log("created dir at " + process.cwd() + `/public/images/${req.user._id}`)
        //         // console.log("__dir Test", __dir)
        //     }
        // })
        let image = req.files.images;
        // let image = req.body;
        console.log("image", image)
        image.mv(path.resolve(process.cwd() + `/public/images/${req.user._id}/`, image.name), async (error) => {
            if (error) {
                console.log("err.mv", error)
            }

            Image.find({ userId: req.user._id })
                .then(found => {
                    if (!found.length) {
                        // await Image.create({
                        Image.create({
                            ...req.body,
                            image: `/public/images/${req.user._id}/` + image.name,
                            userId: req.user._id,
                            userName: req.user.username,
                            type: "profile"
                        })
                        User.findOneAndUpdate({ _id: req.user._id }, { profileImg: `/public/images/${req.user._id}/` + image.name })
                            .then(userFound => {
                                // console.log("foundUser", userFound)
                                res.json({ message: "Good upload" })
                            })

                    } else if (found.length && found[0].type == "profile") {
                        console.log("found.length hit")
                        Image.findByIdAndUpdate(found[0]._id, { image: `/public/images/${req.user._id}/` + image.name })
                            .then(updated => {


                                User.findOneAndUpdate({ _id: req.user._id }, { profileImg: `/public/images/${req.user._id}/` + image.name })
                                    .then(userFound => {
                                        // console.log("foundUser", userFound)
                                        res.json({ message: "upload Successful", profile: userFound })
                                    })
                                // console.log("updated", updated)
                                // res.json({"message": "Image Updated"})
                            }
                            )
                            .catch(err => console.log("update Err", err))
                    }

                })
        })
    },

    galleryUpload: (req, res) => {
        // console.log("gallery", req.files)
        req.files.images.forEach((obj) => obj.mv(path.resolve(process.cwd() + `/public/images/${req.user._id}/gallery/`, obj.name)))

        let galleryPath = []

        req.files.images.forEach((obj) => galleryPath.push(`/public/images/${req.user._id}/gallery/` + obj.name))

        // console.log("galleryPath", galleryPath)

        // let template = {
        //     path: "insert path",
        //     votes: 0,
        //     comments: [],
        //     tag: [],
        //     user: req.user._id
        // }
        let galleryIDs = []

        User.findById(req.user._id)
            .then(foundUser => {
                // console.log("foundUser", foundUser)

                req.files.images.forEach((obj) => Gallery.create({

                    path: `/public/images/${req.user._id}/gallery/` + obj.name,
                    likes: 0,
                    comments: [],
                    tag: [],
                    user: req.user._id

                })
                    .then(created => {
                        // console.log("createdID", created._id)
                        galleryIDs.push(created._id)
                        foundUser.gallery.push(created._id)
                        // console.log("galleryIDS", galleryIDs)
                        // foundUser.save()
                        User.findOneAndUpdate({ _id: foundUser._id }, { $push: { 'gallery': created._id } })
                            .catch(err => console.log('updated gallery error', err))
                    })
                    .catch(err => console.log('updated gallery error', err))
                )


                // foundUser.gallery.push(...galleryIDs)
                // foundUser.save()

            })
            .catch(err => console.log("err", err))

        // .then(created => {
        //     User.findById(req.user._id)
        //         .then(found => {
        //             found.gallery.push(created._id)
        //         })
        //     found.save()
        //         .catch(err => console.log("gallery Error", err))
        // })
        // req.files.images.forEach((obj) => Gallery.create({
        //     // path:  `/public/images/${req.user._id}/gallery/`, obj[name],

        //     // )
        // })



        // Image.create({
        //     ...req.body,
        //     image: `/public/images/${req.user._id}/` + image.name,
        //     userId: req.user._id,
        //     userName: req.user.username,
        //     type: "profile"
        // })


        // User.findOneAndUpdate({ _id: req.user._id }, {gallery: })


        // User.findOne({ _id: req.user._id })
        //         .then(found => {
        //             console.log("found", found)
        //             // found.gallery.push(galleryPath)

        //             req.files.images.forEach((obj) => found.gallery.push(`/public/images/${req.user._id}/gallery/` + obj.name))

        //             found.save()


        //         })

    },


    profileUploadRender: (req, res) => {

        res.json({ message: "render" })
        // imageDelete: (res, req) => {
        //     console.log("ImageDelete-req-body", req.body)
        //     Image.
        // }
    },

    galleryImg: (req, res) => {
        console.log("galleryImg", req.params)
        Gallery.findById(req.params.img)
            .populate({
                path: 'comments',
                populate: { path: 'comments', options: { _recursed: true } }
            })
            .then(found => {
                console.log("found", found)
                res.json(found)
            })
            .catch(err => console.log("err", err))
    },

    galleryImgAddLike: (req, res) => {
        // console.log("gallAddLike", req.params)
        console.log("req.body - LIKE", req.body)
        console.log("ADD IMG like hit")


        if (req.body.PhotoLike.type === 'img') {


            User.findById(req.body.PhotoLike.ownerId)
                .then(found => {
                    // console.log("foudn", found)
                    found.notifications.push(req.body)
                    found.save()
                })


            Gallery.findByIdAndUpdate(req.params.img)
                .populate('comments')
                .then(found => {
                    console.log("foundImg", found)
                    found.likes += 1
                    found.save()
                    res.json(found)
                })
                .catch(err => console.log(err))

        } else {

            console.log("NESTED DOO DAD")
            ImageComment.findByIdAndUpdate(req.body.PhotoLike.id)
                .populate('comments')
                .then(found => {
                    console.log("found img comment addmin like to commment", found)
                    found.likes += 1
                    found.save()
                    // res.json(found)
                    Gallery.findByIdAndUpdate(req.params.img)
                        .populate('comments')
                        .then(found => {
                            // console.log("foundImg", found)
                            // found.votes += 1
                            // found.save()
                            res.json(found)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        // Gallery.updateOne({_id: req.params.id}, ${inc: votes})
    },

    // galleryImgCommentAddLike: (req, res) => {
    //     console.warn("WHAT THE FUCL")
    //     console.log("adding like to img comment", req.body)
    //     console.log("ADD LIKE COMMENT HIT")

    //     ImageComment.findByIdAndUpdate(req.body.id)
    //     .populate('comments')
    //     .then(found => {
    //         console.log("found img comment addmin like to commment", found)
    //         found.votes += 1
    //         found.save()
    //         res.json(found)
    //     })
    // },

    galleryImgAddComment: (req, res) => {
        console.log("galleryImgAddComment.body, ", req.body)

        // User.updateOne({_id :req.body.PhotoComment.ownerId}), { $push: { 'notifications': req.body } }, {new: true}
        // .then(found => console.log("foudn user", found))

        ImageComment.create(req.body.PhotoComment.comment)
            // .populate('comments')
            .then(created => {
                console.log("galleryImgAddComment created", created)
                created.nestedPath.push(req.body.PhotoComment.OgImage)
                created.nestLevel = 0
                created.save()

                Gallery.findByIdAndUpdate(req.body.PhotoComment.comment.OgImage)
                    .populate('comments')
                    .then(image => {
                        // console.log('image', image)
                        image.comments.push(created._id)
                        image.save()
                        res.json(image)
                    })
                // 
                req.body.createdId = created._id
                // 
                User.findById(req.body.PhotoComment.ownerId)
                    .then(found => {
                        // console.log("foudn", found)

                        //  NEED CREATED ID FOR comment to scroll to link.... its not in req.body as not created yet... nmake custom payload......

                        found.notifications.push(req.body, created)
                        // found.notifications.push(created)
                        found.save()
                    })
            })
            .catch(err => console.log(err))
            .catch(err => console.log("create err", err))


    },
    galleryImgAddCommentComment: (req, res) => {
        // console.log("req.body, ", req.body)
        console.log("ADDING nested comment", req.body)
        // User.updateOne({_id :req.body.PhotoComment.ownerId}), { $push: { 'notifications': req.body } }, {new: true}
        // .then(found => console.log("foudn user", found))

        ImageComment.create(req.body.PhotoComment.comment)
            // .populate('comments')
            .then(created => {
                console.log("created", created)
                // created.nestedPath.push(req.body.OgImage)

                ImageComment.findByIdAndUpdate({ _id: req.body.PhotoComment.comment.parentdoc },
                    {
                        $push: { 'comments': created._id },
                        $inc: { "commentCount": 1 },
                    }, { new: true })
                    .then(foundParent => {
                        console.log("foundParent", foundParent)



                        created.nestLevel = foundParent.nestLevel + 1
                        created.nestedPath = foundParent.nestedPath
                        created.nestedPath.push(foundParent._id)
                        created.save()

                        Gallery.findById(req.body.PhotoComment.OgImage)
                            .then(ogImg => {
                                console.log("ogImg", ogImg)
                                res.send(ogImg)
                                User.findById(req.body.PhotoComment.ownerId)
                                    .then(found => {
                                        console.log("foudn", found)
                                        console.log("created", created)
                                        console.log("Pushing Notification cmt cmt photo", req.body)

                                        //  NEED CREATED ID FOR comment to scroll to link.... its not in req.body as not created yet... nmake custom payload......
                                        req.body.createdId = created._id
                                        req.body.PhotoComment.comment.OgImage = ogImg._id
                                        found.notifications.push(req.body)
                                        // found.notifications.push(created)
                                        found.save()
                                    })

                            })

                    })
                    .catch(err => console.log("errr", err))
            })

            .catch(err => console.log("errr", err))

        //         // Gallery.findByIdAndUpdate(req.body.PhotoComment.comment.OgImage)
        //         //     .populate('comments')
        //         //     .then(image => {
        //         //         console.log('image', image)
        //         //         image.comments.push(created._id)
        //         //         image.save()
        //         //         res.json(image)
        //         //     })
        //         // 
        //         // req.body.createdId = created._id
        //         // 
        //         User.findById(req.body.PhotoComment.ownerId)
        //             .then(found => {
        //                 console.log("foudn", found)

        //                 //  NEED CREATED ID FOR comment to scroll to link.... its not in req.body as not created yet... nmake custom payload......

        //                 found.notifications.push(req.body, created)
        //                 // found.notifications.push(created)
        //                 found.save()
        //             })
        //     })
        //     .catch(err => console.log(err))
        //     .catch(err => console.log("create err", err))


    },



    galleryAddTag: (req, res) => {
        // console.log("addtag", req.body)
        // let tags = req.body.tagged
        User.updateMany({ _id: { $in: req.body.photoTag.tagged } }, { $push: { 'notifications': req.body } })
            // .then(foundUsers => {
            //     console.log("foundUsers", foundUsers)
            //     foundUsers.forEach((user) => {
            //         user.notifications.push(req.body)
            //     })
            //     foundUsers.save()

            // })
            // .then((updated) => updated.save())
            .catch(err => console.log(err))
    },

    // User.findOneAndUpdate({ _id: foundUser._id }, { $push: { 'gallery': created._id } })
    // 
    galleryRemoveImage: (req, res) => {
        console.log("Remove Img", req.body)

        Gallery.findOneAndRemove({ _id: req.body.imgId })
            .then(deleted => {
                console.log("deleted", deleted)

                User.findByIdAndUpdate(req.body.owner, { $pull: { 'gallery': req.body.imgId } })
                    .then(pulled => console.log("puller", pulled))
                    .catch(err => console.log("delete IMg from user err", err))

                console.log("deleted path", deleted.path)
                
                fs.rmSync(path.resolve(process.cwd() + deleted.path))

            })
  
    },

    getGallery: (req, res) => {
        // console.log("getGalley", req.params)
        User.findById(req.params.id)
            .populate('gallery')
            .then(found => {
                // console.log("found user gallery", found)
                res.json(found.gallery)
            })
            .catch(err => console.log("getgallery err", err))
    }


}
