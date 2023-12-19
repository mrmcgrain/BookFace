const User = require("../models/capstone.model.js")
const { Feeds, Comments } = require("../models/feed.model.js")
const Image = require("../models/image.model")
const path = require('path')
const fs = require("fs")

module.exports = {

    addFeed: (req, res) => {
        console.log("addFeed-req.body", req.body)
        console.log("addFeed-req.bodyIMAGE", req.body.images)
        console.log("req.file", req.files)
        // console.log("addFeed-req.body", req.body.feed.author)
        /// find user and update myfeeds section as well







        Feeds.create(req.body)
            .then(created => {


                if (req.files) {
                    let image = req.files.images;
                    image.mv(path.resolve(process.cwd() + `/public/images/feed/${created._id}`, image.name), async (error) => {
                        if (error) { console.log("err.mv", error) }
                    })

                    created.imgPath = `/public/images/feed/${created._id}/` + image.name
                }




                console.log("created FEED", created)

                created.OgFeed = created._id
                created.save()
                User.findByIdAndUpdate({ _id: created.author }, { $push: { feeds: created._id } })
                    .then(found => {
                        // console.log("found", found)
                    })
                    .catch(err => console.log("user feed update err", err))
                res.json(created)
            })


            .catch(err => console.log("Feed Create err", err))

    },


    getFeeds: (req, res) => {
        // console.log("getFeeds", req.body)
        //// Add aggregation for ppl you follow and sort so newest are at top
        Feeds.find()
            // .populate("comments")
            .populate({
                path: 'comments',
                populate: { path: 'comments', options: { _recursed: true } }
            })
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
            .catch(err => console.log("Feed Get error", err))
    },


    getMyFeeds: (req, res) => {
        // console.log("getMyFeeds", req.body)
        // console.log("reqUser", req.user)
        //// Add aggregation for ppl you follow and sort so newest are at top
        Feeds.find({ author: req.user._id })
            .populate({
                path: 'comments',
                populate: { path: 'comments', options: { _recursed: true } }
            })
            .then(found => {
                // console.log("found", found)
                res.json(found)
            })
            .catch(err => console.log("Feed Get error", err))
    },

    getFollowingFeeds: (req, res) => {
        // console.log("getFollowingFeeds", req.body)
        User.findById(req.user._id)

            .then(found => {
                // console.log("found", found)
                // console.log("following", found.following)
                Feeds.find({ author: { $in: [...found.following] } })
                    .populate({
                        path: 'comments',
                        populate: { path: 'comments', options: { _recursed: true } }
                    })
                    .then(feeds => {
                        // console.log("feeds", feeds)
                        res.json(feeds)
                    })
                    .catch(err => console.log("Feed err", err))

            })
            .catch(err => console.log(err))

    },

    // ////////////    JUST LIKE LIKES, use a if else to id the feed / comment on whwere ot push the bnew comment

    addComment: (req, res) => {
        console.log("addcomment", req.body)
        //req.body.ogFeed is the OG feed ID to reference
        Comments.create(req.body)
            .then(created => {
                // console.log("created", created)
                created.nestedPath.push(req.body.OgFeed)
                created.save()
                // figure out how to determine if your commenting a comment or a feed
                Feeds.findByIdAndUpdate({ _id: created.OgFeed },
                    //     Feeds.findByIdAndUpdate({ _id: created.OgFeed },
                    {
                        $push: { "comments": created._id },
                        $inc: { "commentCount": 1 },
                    }, { new: true })


                    .then(updated => {
                        // console.log("updated", updated)


                        User.findOneAndUpdate({ _id: req.body.ogAuthor },
                            {
                                $push: {
                                    notifications: [
                                        {
                                            comment: {
                                                author: req.body.authorName,
                                                authorId: req.body.authorId,
                                                parentDoc: updated._id,
                                                comment: req.body.content,
                                                createdAt: new Date(),
                                                ogFeed: req.body.OgFeed

                                            }
                                        }
                                    ]
                                }
                            })
                            .then(ogFound => console.log("og Found"))

                        res.json(updated)

                    })



                    //     res.json(updated)
                    // })
                    .catch(err => console.log("err", err))
            })
            .catch(err => console.log("err", err))

        // Feeds.findByIdAndUpdate({ _id: req.body.id },
        //     {
        //         $push: { comments: req.body },
        //         $inc: { "commentCount": 1 },
        //     }, { new: true })

        //     .then(found => {

        //         User.findOneAndUpdate({ _id: req.body.ogAuthor },
        //             {
        //                 $push: {
        //                     notifications: [
        //                         {
        //                             comment: {
        //                                 author: req.body.authorName,
        //                                 authorId: req.body.authorId,
        //                                 docId: req.body.id,
        //                                 comment: req.body.newComment,
        //                                 createdAt: new Date()
        //                             }
        //                         }
        //                     ]
        //                 }
        //             })
        //             .then(ogFound => console.log("og Found", ogFound))

        //         res.json(found)

        //     })

        //     .catch(err => { console.log("add comment error", err) })


    },


    addCommentComment: (req, res) => {
        // console.log("addCommentCommet", req.body)

        Comments.create(req.body)
            .then(created => {
                // console.log("created", created)

                // figure out how to determine if your commenting a comment or a feed
                Comments.findByIdAndUpdate({ _id: created.parentdoc },
                    //     Feeds.findByIdAndUpdate({ _id: created.OgFeed },
                    {
                        $push: { "comments": created._id },
                        $inc: { "commentCount": 1 },
                    }, { new: true })

                    .then(foundParent => {
                        console.log("foundParent")



                        created.nestLevel = foundParent.nestLevel + 1
                        created.nestedPath = foundParent.nestedPath
                        created.nestedPath.push(foundParent._id)
                        created.save()




                    })
                    // .then(foundParent => console.log("foundParent", foundParent))
                    .catch(err => console.log("errr", err))

                User.findOneAndUpdate({ _id: created.parentAuthor },
                    {
                        $push: {
                            notifications: [
                                {
                                    comment: {
                                        author: req.body.authorName,
                                        authorId: req.body.authorId,
                                        parentDoc: created.parentdoc,
                                        comment: req.body.content,
                                        createdAt: new Date(),
                                        ogFeed: req.body.OgFeed

                                    }
                                }
                            ]
                        }
                    })



                    .then(updated => {
                        // console.log("updated", updated)
                        res.json(updated)
                    })
                    .catch(err => console.log("err", err))
            })
            .catch(err => console.log("err", err))

    },


    addLike: (req, res) => {
        console.log("addLike", req.body)

        /// Figure out how to only allow the same user to like once......... ////////

        // if(req.body.type == "feed"){

        //     Feeds.findByIdAndUpdate({ _id: req.body.id }, { $inc: { "likes": 1 } }, { new: true })
        //     .then(liked => {
        //         console.log(liked)
        //         // res.json(liked)
        //     })
        //     .catch(err => console.log("like error", err))
        // }else {

        //     Comments.findByIdAndUpdate({ _id: req.body.id }, { $inc: { "likes": 1 } }, { new: true })
        //     .then(liked => {
        //         console.log(liked)
        //         // res.json(liked)
        //     })
        //     .catch(err => console.log("like error", err))
        // }

        /////////// GOOD CODE BELOW.... Turned off for recursion TESTING    ///////////

        if (req.body.type == "feed") {

            Feeds.findById(req.body.id)
                .then(found => {
                    console.log("found feed", found)
                    if (!found.likedBy.includes(req.user._id)) {
                        // console.log("feed vote IF")
                        found.likes += 1
                        found.likedBy.push(req.user._id)
                        found.save()



                        User.findOneAndUpdate({ _id: found.author },
                            {
                                $push: {
                                    notifications: [
                                        {
                                            like: {
                                                likedDoc: found._id,
                                                user: req.user.username,
                                                userId: req.user._id,
                                                createdAt: new Date(),
                                                ogFeed: found.OgFeed

                                            }
                                        }
                                    ]
                                }
                            })


                            .then(res.json(found))




                            .catch(err => console.log("err", err))
                    } else {
                        res.json({ message: "already voted clive" })
                    }
                })

        } else if (req.body.type == "comment") {
            // console.log("add like elseIF", req.body)

            Comments.findById(req.body.id)

                .then(found => {
                    console.log("found feed", found)

                    if (!found.likedBy.includes(req.user._id)) {
                        console.log("feed vote IF")
                        found.likes += 1
                        found.likedBy.push(req.user._id)
                        found.save()


                        User.findOneAndUpdate({ _id: found.authorId },
                            {
                                $push: {
                                    notifications: [
                                        {
                                            like: {
                                                likedDoc: found._id,
                                                user: req.user.username,
                                                userId: req.user._id,
                                                createdAt: new Date(),
                                                ogFeed: found.OgFeed
                                            }
                                        }
                                    ]
                                }
                            })



                            .then(res.json(found))
                            .catch(err => console.log("err", err))
                    } else {
                        res.json({ message: "already voted clive" })
                    }
                })
        }
    },




    addFollow: (req, res) => {
        console.log("req-body", req.body)

        User.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { "following": req.body.user } }, { new: true })
            .then(followed => {
                res.json(followed)
                // console.log("followed", followed)
            })
            .catch(err => console.log("following error", err))

        User.findByIdAndUpdate({ _id: req.body.user }, { $addToSet: { "followers": req.user._id } }, { new: true })
            .then(followed => {
                // console.log("followed", followed)
            })
            .catch(err => console.log("following error", err))


    },


    removeFollow: (req, res) => {
        console.log("rmv follow", req.params)
        User.findByIdAndUpdate(req.user._id, { $pull: { 'following': req.params.id } })
            .then(pulled => console.log("puller", pulled))
            .catch(err => console.log("delete IMg from user err", err))

        User.findByIdAndUpdate(req.params.id, { $pull: { 'followers': req.user._id } })
            .then(pulled => console.log("puller", pulled))
            .catch(err => console.log("delete IMg from user err", err))

    },
    //////////////////////////////////////////////////////////
    // Notifications //
    /////////////////////////////////////////////////////////////

    removeNotice: (req, res) => {
        console.log("removeNotice", req.body)
        // User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { notifications: 0 } }, { new: true })

        User.findOne({ _id: req.user._id })
            .then(found => {
                // console.log("found", found)
                // found.notifications.splice(parseInt(req.body.index), 1)                       notifications
                // console.log("WTF", found.notifications)
                found.notifications.splice(req.body.index, 1)
                found.save()
                // res.json({notifications: found.notifications})
                res.json(found)
                // ready for pop info in req.body.index 
            })
            .catch(err => console.log("err", err))
    },

    findComment: (req, res) => {
        // console.log("findcommment", req.params)
        Comments.find({ _id: req.params.id })
            .then(found => {
                console.log("foundComment", found)
                res.json(found)
            })
            .catch(err => console.log("err", err))
    },

    findFeed: (req, res) => {
        // console.log("findFeed", req.params)
        Feeds.find({ _id: req.params.id })
            .populate({
                path: 'comments',
                populate: { path: 'comments', options: { _recursed: true } }
            })
            .then(found => {
                // console.log("foundfeed", found)
                res.json(found)
            })
            .catch(err => console.log("err", err))
    },

    searchFeed: (req, res) => {
        console.log("searchFeed", req.params)
        let test = req.params.data
        Feeds.find({ feedContent: { $regex: test, $options: 'i' } })
            .populate({
                path: 'comments',
                populate: { path: 'comments', options: { _recursed: true } }
            })
            .then(found => {
                console.log("found search", found)
                res.json(found)
            })

    }


}