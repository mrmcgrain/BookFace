const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const passport = require('passport')
const passportLocal = require("passport.socketio")
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

const session = require('express-session')

const socketServer = require("./socketServer")

// const jwt = require('jsonwebtoken')
// const config = require("./jwt/config")
// const secret = config.secret


// function isCheckedIn(req, res, next) {
//     console.log("req-headers", req.headers)
//     if (req.headers.authorization) {
//         let token = req.headers.authorization.split(" ")[1]
//         try {
//             req._guest = jwt.decode(token, secret)
//         } catch {
//             console.log("CATCH ERR")
//             res.status(403).json({ error: "Token is not valid" })
//         }
//         if (req._guest.name) return next()
//     }
//     res.status(403).json({ error: "Please check-in to recieve a token" })
// }


// app.use("/jwt", isCheckedIn)


// const {Server}  = require("socket.io")
// const http = require("http")
// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     }
//   })


//   io.on('connection', (socket)=>{
//     console.log("socket-id", socket.id)
//       socket.on('join_room', (data)=>{
//         console.log('room joined' , data)
//           socket.join(data)
//           console.log("socket.adapter.rooms", socket.adapter.rooms)


//       })

//       socket.on('send_message', (data)=>{
//         console.log('send_message', data)
//         io.in(data.room).emit('recieve_message', data.message)
//       })
//   })


const fs = require('fs')
const fileUpload = require('express-fileupload')
console.log("fileup", fileUpload)
const path = require('path')

app.use(fileUpload({
    createParentPath: true
}))

app.use("/public/", express.static(process.cwd() + "/public"))

require('./config/capstone.config') 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cors({
    origin: ["http://localhost:3000/", "http://localhost:3000", "http://localhost:8080/", "http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser(process.env.SECRET_KEY))

app.use(passport.initialize())
app.use(passport.session())
require("./config/passport.config")(passport)

const Routes = require("./routes/capstone.routes")

// const router = require("./routes/check-in")

// router(app)
// app.use(router)
Routes(app)

const port = 8080

const server = socketServer.socketServer(app)

// app.listen(port, () => console.log(`Server is popping on port ${port}`))
// server.listen(port, () => console.log(`Server w/ socket-IO is popping on port ${port}`))

server.listen(port, () => console.log(`Server w/ socket-IO is popping on port ${port}`))
