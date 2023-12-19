const User = require("../models/capstone.model")
const Messages = require("../models/messaging.model")
const Image = require("../models/image.model")
const bcrypt = require('bcrypt')
const passport = require('passport')
const path = require('path')
const fs = require("fs")

module.exports = {

    addMessage: (req, res) => {
        console.log("adding Message")

        Messages.create(req.body)
            .then(created => {
                console.log("created", created)
                User.findById(req.body.recipient) // find Recipient 
                    .then(foundUser => {
                        // console.log("FoundUser", foundUser)
                        // foundUser.messages.push("WTF")
                        if (!foundUser.messages.find((item) => item.queryId == created.queryId)) {
                            foundUser.messages.push({
                                queryId: created.queryId,
                                userId: created.sender,
                                senderName: created.senderName,
                                messages: [created._id],
                                messageCount: 0,
                                profileImg: created.profileImg,
                                recent: created.messageContent
                            })
                            foundUser.save()
                            console.log("no found ID")

                        } else {

                            console.log(" id found")
                            foundUser.messages.find((item) => item.queryId === created.queryId ?
                                (
                                    item.messages.push(created._id),
                                    item.recent = created.messageContent
                
                                )
                                : null
                            )
                            foundUser.save()
                            console.log("foundUser saved?")
                        }
                    })
                    .catch(err => console.log("addmessage err", err))
            })

        // Messages.findOne({ queryId: req.body.queryId })

        //     .then(found => {
        //         // console.log("message-Found", found)

        //         /// Create queryID if not already done ....

        //         if (!found) {

        //             Messages.create(req.body)
        //                 .then(created => {
        //                     User.findById(created.sender)
        //                         .then(senderFound => {


        //                             if (senderFound.friends.filter((obj) => obj.userId.toString() !== created.recipient.toString())) {
        //                                 console.log("no friends")

        //                             } else {

        //                                 let friend = senderFound.friends.find((obj) => obj.userId.toString() === created.recipient.toString())
        //                                 friend.messageId = created.queryId
        //                                 friend.save()

        //                             }
        //                         })
        //                     // console.log('created', created)
        //                 })

        //                 .catch(err => console.log('add message error', err))

        //         } else if (found) {

        //             Messages.create(req.body)
        //                 .then(created => {
        //                     console.log("msgCreate", req.body)

        //                     User.find({ _id: req.body.recipient })
        //                         .then(recipient => {
        //                             console.log("recipent found", recipient)

        //                             recipient.messages.find((item) => {
        //                                 if(item.queryId == created.queryId){

        //                                 }
        //                             }
        //                             )


        //                         })

        //                         //     User.updateOne({ _id: req.body.recipient }, { 'messages.queryId': created.queryId },
        //                         //         {
        //                         //             $set: { "messages.$.messsages": created._id }
        //                         //         },
        //                         //         // {
        //                         //         //     $inc: { 'messages.$.messageCount': 1 }
        //                         //         // }
        //                         //     )
        //                         //     , { "upsert": true }
        //                         // })




        //                         // User.find({ _id: req.body.recipient })
        //                         //     .then(foundUser => {
        //                         //         console.log("foundUser", foundUser)

        //                         //         foundUser.updateOne({ 'messages.queryId': created.queryId },
        //                         //             { $push: { "messages.$.messsages": created._id } },
        //                         //             {
        //                         //                 $inc: { 'messages.$.messageCount': 1 }
        //                         //             }
        //                         //         ), { "upsert": true }
        //                         //     })
        //                         .catch(err => console.log("no user on addmsg", err))

        //                     // console.log("msg Id Found: creating msg", created)
        //                     // })

        //                     // .catch(err => console.log("msg update err", err))
        //                     // .then(updated => console.log("updated", updated))
        //                 })
        //         }
        //         // console.log("")


        //         // })



        //         // } else if ( users already have a message stream){

        //         //     Messages.findOneAndUpdate(somehow find both users... .)
        //         // }
        //     })
    },



    // users: [{
    //     username: String,
    //     userId:  Schema.Types.ObjectId
    // }],
    // message: [{
    //     messageId: Schema.Types.ObjectId,
    //     messageContent: String,
    //     sender:  Schema.Types.ObjectId,
    //     recipient:  Schema.Types.ObjectId,
    //     timestamps: true
    // }],
    // collection: message

    getThreadMessages: (req, res) => {
        console.log("getting thread messages")
        // console.log("get message", req.body)
        // console.log("getting messages", req.user)
        // let temp = []
        Messages.find({ queryId: req.body.queryId })
            .then(messages => {
                // console.log("msg res", messages)
                User.findById(req.user._id)
                .then(found => {
                    // console.log("found", found)
                    found.messages.find((item) => item.queryId === req.body.queryId ?
                    (
                        // console.log("wtf", item)
                        item.messageCount = item.messages.length,
                        item.recent = ""


                    )
                    : null
                )
                found.save()

                })



                res.json(messages)
            })

        // Messages.aggregate([
        //     {
        //         $match:
        //             { recipient: req.user._id }
        //     },
        //     {
        //         $project:
        //         {
        //             queryId: 1,
        //             senderName: 1,
        //             recipient: 1,
        //             messageContent: 1,
        //         }
        //     },
        //     {
        //         $filter: {
        //             input: Messages,
        //             as: "newMessages",
        //             cond: { $ne: [$$newMessages.senderName, messages.senderName] }
        //         }
        //     }
        // ])
        //     .then(msgs => {
        //         console.log("allMsgs", msgs)
        //         res.json(msgs)
        //     })





    },

    getAllMessages: (req, res) => {
        // console.log("getAllmessgae", req.body)
        console.log("Getting All messages", req.user)
        // Messages.find({ queryId: req.body.queryId })
        Messages.aggregate([
            {
                $match:
                    { recipient: req.user._id }
            },
            // {
            //     $project: { 
            //         senderName: 1,
            //         recipient: 1
            //     }
            // },
            {
                $group: {
                    _id: { sender: '$senderName', id: '$sender' },
                    ///  add new message [] here for accurate count

                }
            },
        ])
            .then(msgs => {
                // console.log("allMsgs", msgs)
                res.json(msgs)
            })

    },


    deleteAllMessages: (req, res) => {
        console.log("del all msg", req.params.id, "req.user", req.user._id)


        Messages.updateMany({ queryId: req.params.id },
            {
                $addToSet: { "deleted": req.user._id }
            }, {new: true})
            .then(updated => res.json(updated))
            .catch(err => console.log("updateErr", err))

        // Messages.find({ queryId: req.params.id })
        //     .then(found => console.log(found))
    },



    // User.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { "following": req.body.user } }, { new: true })
    //         .then(followed => {
    //             // console.log("followed", followed)
    //         })
    //         .catch(err => console.log("following error", err))




    // User.findOneAndUpdate({ _id: req.body.ogAuthor },
    //     {
    //         $push: {
    //             notifications: [
    //                 {
    //                     comment: {
    //                         author: req.body.authorName,
    //                         authorId: req.body.authorId,
    //                         parentDoc: updated._id,
    //                         comment: req.body.content,
    //                         createdAt: new Date(),
    //                         ogFeed: req.body.OgFeed

    //                     }
    //                 }
    //             ]
    //         }

















    test: (req, res) => {
        Messages.findById("64dbc68bffdfe30e18bfb129")
            .then(found => console.log("found", found))
    }

}