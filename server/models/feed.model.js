

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// const Feeds = mongoose.model("Feeds", new Schema({
const FeedsSchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    feedContent: String,
    likes: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // comments: [{
    //     authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    //     authorName: String,
    //     newComment: String,
    //     created: Date,
    //     // comments: [{}]
    // }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    imgPath: String,
    OgFeed: { type: Schema.Types.ObjectId, ref: 'Feeds' },

    commentCount: Number

}, { timestamps: true }
)


// const Comments = mongoose.model("Comments", new Schema({
const CommentSchema = new mongoose.Schema({
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    likes: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    OgFeed: { type: Schema.Types.ObjectId, ref: 'Feeds' },
    OgComment: { type: Schema.Types.ObjectId, ref: 'Comments' },
    commentCount: Number,
    parent: { type: Schema.Types.ObjectId, ref: 'Comments' },
    parentdoc: { type: Schema.Types.ObjectId, ref: 'Comments' },
    parentAuthor: { type: Schema.Types.ObjectId, ref: 'User' }, /// for Reply vs add comment
    nestLevel: Number,
    nestedPath: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]

}, { timestamps: true }
    // ))
)

function autoPopulateComments(next) {
    this.populate('comments')
    next()
}

FeedsSchema.post("save", function () {
    console.log("post attempt")

})

CommentSchema
    .pre('findOne', autoPopulateComments)
    .pre('find', autoPopulateComments)


// CommentSchema.pre('find', function (next) {
//     if (this.options._recursed) {
//         return next();
//     }
//     this.populate({ path: 'comments', options: { _recursed: true } });
//     next();
// });

const Comments = mongoose.model("Comments", CommentSchema)
const Feeds = mongoose.model("Feeds", FeedsSchema)

// module.exports = Feeds
module.exports = { Comments, Feeds } 