const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    email: String,
    gender: String,
    collage: [String],
    highSchool: [String],
    sports: [String],
    music: [String],
    vibe: [String],
    relationshipStatus: String,
    searchingFor: [String],
    lastName: String,
    nickName: String,
    isOnline: Boolean,
    friends: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
        messageId: String,
        friend: String,
        created: Date,
        status: String
    }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    notifications: [{}],
    blocked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    profileImg: String,
    // gallery: [ String ],
    gallery: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],

    age: Number,
    bio: String,
    pronoun: String,
    location: {
        city: String,
        state: String,
        zipcode: String
    },
    favoriteMusic: String,
    secretQuestion: String,
    secretAnswer: String,
    birthday: Date,
    profession: String,
    hobbies: [String],
    feeds: [{ type: Schema.Types.ObjectId, ref: 'Feeds' }],
    messages: [{
        // messages: []
        queryId: String,
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }],
        messageCount: Number,
        status: String,
        senderName: String,
        profileImg: String,
        recent: String
    }],

    // }]
},
    { timestamps: true })

// const MessageSchema = new Schema({

//     messageContent: { type: String },
//     sender: { type: Schema.ObjectId, ref: 'Sender' },
//     userId: { type: Schema.ObjectId, ref: 'User' },
//     // timestamps: true,

// })




// const ImageSchema = new Schema({
//     image: String,
//     userId: Schema.Types.ObjectId,
//     userName: String
// })

const User = mongoose.model("User", UserSchema)
// const Image = mongoose.model("Image", ImageSchema)
// const Message = mongoose.model("Message", MessageSchema)

module.exports = User 