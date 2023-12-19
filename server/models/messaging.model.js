

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Messages = mongoose.model("Messages", new Schema({
    queryId: String,
    sender: Schema.Types.ObjectId,
    senderName: String,
    recipient: Schema.Types.ObjectId,
    messageContent: String,
    read: [String],
    deleted: [String],
    profileImg: String,
}, { timestamps: true }
))

module.exports = Messages
// const Messages = mongoose.model("Messages", new Schema({

//     queryId: String,
//     messages: [
//         {
//             sender: Schema.Types.ObjectId,
//             senderName: String,
//             recipient: Schema.Types.ObjectId,
//             messageContent: String,
//             read: [String],
//             deleted: [String]
//         }
//     ]
// }, { timestamps: true }
// ))



// let MessageSchema = new Schema({
//     const Messages = mongoose.model("Messages", new Schema({
//     // users: [Schema.Types.ObjectId],
//     sender: Schema.Types.ObjectId,
//     recipient: Schema.Types.ObjectId,
//     messages: [{
//         // messageId: Schema.Types.ObjectId,
//         messageContent: String,
//         sender: Schema.Types.ObjectId,
//         recipient: Schema.Types.ObjectId,
//     }],
//     queryId: String

// }, { timestamps: true })

// )
// let GroupsSchema = new Schema({
//     members:
// })

// const Messages = mongoose.model("Messages", MessageSchema)



// let Schema = mongoose.Schema;

// let MessageSchema =  new Schema({

//     messageContent:{ type:String },

//     //idStatusMessage:{ type:Boolean },

//     user :{ type: Schema.ObjectId, ref:'User'},

//     // urlFile:{ type:String, default:'Image.png'},

// },{     versionKey:false,

//         timestamps:true, 

// });

// let Message = mongoose.model('Message' ,MessageSchema);

// let GroupsSchema =  new Schema({

//     nameChat:{ type:String },

//     user :{type: Schema.Types.ObjectId, ref:'User'}, 

//     //contact:[ContactSchema] 

//     // email:[ { type:String, unique:true, trim:true, require:true}],

//     messages:[MessageSchema] 

// },{     versionKey:false,

//         timestamps:true,      

// });

// //cargar grupos

// GroupsSchema.plugin(mongoosePaginate);

// module.exports  = mongoose.model('Group',  GroupsSchema);