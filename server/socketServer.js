
const { Server } = require("socket.io")
const http = require("http")
// const app = require("./server")
// const server = http.createServer(app)

module.exports = {

    socketServer(app) {


        const server = http.createServer(app)

        const io = new Server(server, {
            cors: {
                // origin: "http://localhost:3000",
                origin: ["http://localhost:3000/", "http://localhost:3000", "http://localhost:8080/", "http://localhost:5173", "http://localhost:5174"],
                methods: ["GET", "POST"]
            }
        })


        io.on('connection', (socket) => {
            // console.log("socket-id", socket.id)

            socket.on('join_room', (data) => { // from Messages  && ViewMessages
                socket.join(data)
                console.log('room joined', data)
                // console.log("socket.adapter.rooms", socket.adapter.rooms)
            })

            socket.on('send_message', (data) => {  //from AddMessage && Messages
                // console.log('send_message', data)
                io.in(data.room).emit('recieve_message', data.message) 

                // to Messages && ViewMessages
            })

            socket.on("typing", (input) => { //from Messages
                // console.log("socket connected", socket.connected)
                // socket.emit("userTyping", true)
                // console.log("typing", input)
                socket.to(input.queryId).emit('still_typing', input.user)
            })

            socket.on("done_typing", (input) => { //from Messages
                // console.log("doneTyping", input)
                socket.to(input.queryId).emit('noTyping', input.user)

            })

            socket.on('loggedIn', (data) => { // from Login
                // console.log("Scoket - logged In", data)
                io.emit("updateLoggedIn", data) // to RightBody
            })
            socket.on('loggedOut', (data) => {  // from Nav
                // console.log("Socket - logged Out", data)
                io.emit("updateLoggedOut", data) // to RightBody
            })


            socket.on('feedPost', (data) => {     //from AddFeed
                // console.log("socket feed", data)
                io.emit("feedUpdated", data) // to Feed
            })

            socket.on("addFriend", (data) => { //From ViewProfile
                console.log("socket add friend", data)
                // ATTEMT to only send ot users affected by change
                // io.emit("updateFriend", data) // to FriendList
                io.emit("updateFriend", data) // to FriendList
            })

            socket.on("activity", (data) => {
                // from Comments && CommentNotification & Feed & Feed Notification
                console.log("socket activity", data)
                io.emit("updateNotification", data) // to Nav
            })

            socket.on("mailCall", (data) =>{ // from Messages
             console.log("mailCall", data)
             io.emit("updateMail", data)    // to messaging...or profile rerender
             //attempt to send to only user needed.... FAIL come back later
            //  io.in(data).emit('updateMail', data) 

            })



        })



        return server

    }
}
// export default socketServer
