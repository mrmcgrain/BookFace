const mongoose = require('mongoose')
const User = require("../models/capstone.model.js")
const Schema = mongoose.Schema



const ImageSchema = new Schema({
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    type: String
})

const GallerySchema = new Schema({
    path: String,
    likes: Number,
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Feeds' }],

    comments: [{ type: Schema.Types.ObjectId, ref: 'ImageComment' }],

    tag: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const ImageCommentSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'ImageComment' }],
    likes: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    OgImage: { type: Schema.Types.ObjectId, ref: 'Gallery' },
    OgComment: { type: Schema.Types.ObjectId, ref: 'ImageComment' },
    commentCount: Number,
    parent: { type: Schema.Types.ObjectId, ref: 'ImageComment' },
    parentdoc: { type: Schema.Types.ObjectId, ref: 'ImageComment' },
    parentAuthor: { type: Schema.Types.ObjectId, ref: 'User' }, /// for Reply vs add comment
    nestLevel: String,  
    //  ????????   ^^^^
    nestLevel: Number,
    nestedPath: [{ type: Schema.Types.ObjectId, ref: 'ImageComment' }],
    created: Date,
    tagged: [{ type: Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: true }
    // ))
)

function autoPopulateComments(next) {
    this.populate('comments')
    next()
}


ImageCommentSchema
    .pre('findOne', autoPopulateComments)
    .pre('find', autoPopulateComments)

const Image = mongoose.model("Image", ImageSchema)
const Gallery = mongoose.model("Gallery", GallerySchema)

const ImageComment = mongoose.model("ImageComment", ImageCommentSchema)


module.exports = { Image, Gallery, ImageComment }