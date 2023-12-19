const mongoose = require('mongoose')

const db = "capstone23"

mongoose.connect(`mongodb://127.0.0.1/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`${db} connected, rejoice and be mery `))
    .catch(err => console.log("Catch-err", err))