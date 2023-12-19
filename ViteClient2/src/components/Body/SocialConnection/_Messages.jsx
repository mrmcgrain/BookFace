import { useData } from "../../../hooks/context-hook"
import { useParams } from 'react-router-dom'
// import AddMessage from "../comps/AddMessage"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import convertDate from "../../../util/convertDate"
import MessagesFooter from "./MessagesFooter"

// import moment from 'moment'


// id only works with url...... thus recipenet is sender... neeed to use test somehow

const socket = io.connect('http://localhost:8080')

const Messages = ({ test, user }) => {

    const { authedUser, profile } = useData()

    const { id } = useParams() //user to send message to

    let queryId
    if (test) {
        console.warn("TEST", test)
        queryId = [authedUser._id, test].sort().join("")

    } else {
        console.warn("ELSE HIT")
        queryId = [authedUser._id, id].sort().join("")
    }
    // let queryId = [authedUser._id, id].sort().join("")

    const payload = { queryId: queryId }
    // to get messages between these two users
    // let payload = 
    // Object.keys(test).length ? payload = {queryId: test._id} : payload = {queryId : queryId}
    // Local state onChange payload for DB
    const [message, setMessage] = useState({})

    // In theroy we will see if the user in room is typing
    const [typing, setTyping] = useState(false)

    // axios retrieves all msgs from DB and stores here
    const [allMsg, setAllMsg] = useState([])

    ///// ATTEMPT to also join users logged in room to send notifation mailcall
    // useEffect(()=>{
    //     socket.emit('join_room',id)

    // },[])

    // Joins socket room on load
    useEffect(() => {

        socket.emit('join_room', queryId)

    }, [queryId])

    // handle "is typing" on recipients chat window
    useEffect(() => {
        socket.on('still_typing', data => {
            // console.log('tying', data)
            setTyping(true)
        })

        socket.on("noTyping", data => {
            // console.log("doneTyping")
            setTyping(false)
        })

    }, [socket])

    /// updates chat messages on [socket] change
    useEffect(() => {

        socket.on('recieve_message', (data) => {
            // console.log("socket Data", data)
            // console.log("in soccket all msg", allMsg)

            setAllMsg(prev => ([
                ...prev,
                data
            ]))

            let newChat = document.getElementById("chat");
            newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })

        })

        //     axios({
        //         method: 'POST',
        //         withCredentials: true,
        //         url: "http://localhost:8080/api/getThreadMessages",
        //         data: payload
        //     })
        //         .then(res => {
        //             // console.log("res")
        //             handleSetAllMsg(res)
        //         })
        //         .then(() => {
        //             // window.location.replace(`http://localhost:3000/users/profile/${id}#chat`)
        //             let newChat = document.getElementById("chat");
        //             newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })

        //         })
        //         .catch(err => console.log("err", err))
        // })

        return () => socket.off('recieve_message')

    }, [socket])

    /// updates chat messages on load
    useEffect(() => {

        axios({
            method: 'POST',
            withCredentials: true,
            url: "http://localhost:8080/api/getThreadMessages",
            data: payload
        })
            .then(res => {
                // console.log("res", res)
                handleSetAllMsg(res)
                //   window.scrollTo(0, document.body.scrollBy)
            })

            // .then(() => {
            //     let newChat = document.getElementById("chat");
            //     newChat.scrollIntoView({ behavior: 'instant', block: 'end' })
            //     console.log("should scroll - getThreadMessages")

            // })
            .catch(err => console.log("err", err))
        // let newChat = document.getElementById("chat");

        // newChat.scrollIntoView({ behavior: 'instant', block: 'end' })
    }, [id])
    /// I set this depenancy to id so when a new user page was viewed it would get thier mesg feed not the last user.....


    useEffect(() => {

        if (allMsg.length) {
            let newChat = document.getElementById("chat");
            newChat.scrollIntoView({ behavior: 'instant', block: 'end' })
            console.log("should scroll - getThreadMessages")
        }


    }, [allMsg])



    const handleSetAllMsg = (input = {}) => {
        // console.log("handleSetAllMsg", input)
        setAllMsg(input.data)
    }

    ////  Delete ALL Msgs

    const handleDeleteAll = (e) => {
        e.preventDefault()

        axios({
            method: "PUT",
            url: `http://localhost:8080/api/messages/deleteall/${queryId}`,

            // url: `http://localhost:8080/api/messages/deleteall/${queryId}`,
            withCredentials: true
        })
            .then(res => {
                console.log("res", res)
                // handleSetAllMsg(res)
                setAllMsg([])


            })
            .catch(err => console.log("err", err))
    }





    ///ON CHANGE HANDLER
    const handleSetMessage = (e) => {

        // setMessage(prev => ({
        //     ...prev,
        //     queryId: queryId,
        //     messages: [{
        //         sender: authedUser._id,
        //         senderName: authedUser.username,
        //         recipient: id,
        //         messageContent: e.target.value,
        //         read: [authedUser._id],
        //         queryId: queryId,
        //         createdAt: new Date()
        //     }]
        // }))
        setMessage(prev => ({
            ...prev,
            sender: authedUser._id,
            senderName: authedUser.username,
            recipient: test ? test : id,
            messageContent: e.target.value,
            read: [authedUser._id],
            queryId: queryId,
            createdAt: new Date(),
            profileImg: profile.data.profileImg

        }))

        socket.emit("typing", { user: authedUser.username, queryId })

        setTimeout(() => {
            socket.emit("done_typing", { user: authedUser.username, queryId })
            // console.log("not typing")
        }, 2000)
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault()

        // let data = { "room": queryId, "message": message.messageContent }
        let data = { "room": queryId, "message": message }

        // console.log("data", data)
        // if (!id) { test = id }
        axios({
            method: "POST",
            url: "http://localhost:8080/api/addMessage",
            data: message
        })
            .then(res => {
                console.log("res-message", res)
                let newChat = document.getElementById("chat");
                newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
            .then(() => {
                // console.log("socket-send HIT")
                // allMsg.data.concat()
            })
            .catch(err => console.warn("ADMSG ERROR", err))

        socket.emit('send_message', data)
        // socket.emit('mailCall', [authedUser._id, id])

        // socket.emit('mailCall', message.recipient)
        socket.emit('mailCall', [authedUser._id, message.recipient])

        setMessage("")

        // let newChat = document.getElementById("chat");
        // newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // newChat.scrollIntoView()
    }


    //useEffect(() => {
    // socket.on('recieved', message => {
    // concat message to messages state object
    // })

    // return () => socket.off('recieved')
    //clean up to remove dupp messages
    // })   

    return (
        <div id='Messages'>
            {/* {console.log("socket:", socket)} */}
            {/* {console.log("message", message)} */}
            {/* {console.log("allmsgs", allMsg)} */}
            {/* {console.log("typeof(allmsg)", typeof (allMsg))} */}
            {/* {console.log("newMsg", newMsg)} */}
            {/* {console.log("filter", allMsg.map((item).filter((item) => item.read.includes(item.recipient)) } */}
            {/* <div> <a href="#chat">test</a></div> */}
            {console.log("Messages Render", queryId)}
            {/* {console.log("allmsg", allMsg)} */}
            {/* {console.log("test", test)} */}
            {/* {console.warn("Message - user test", user)} */}

            {/* <div> <a href={`#${allMsg.length - 1}`}>test</a></div> */}
            <div>

                <p className="flex flex-center border"> {user} </p>
            </div>
            <div className="messageView">
                {allMsg
                    ?
                    (
                        <div>


                            {allMsg.filter((msg) => !msg.deleted.includes(authedUser._id)).map((item, i) => {
                                // console.log("item", item)
                                //                  <div class="container">
                                //   <img src="/w3images/bandmember.jpg" alt="Avatar">
                                //   <p>Hello. How are you today?</p>
                                //   <span class="time-right">11:00</span>
                                // </div>

                                return (
                                    <div key={i} id={i} className="chat" >

                                        <div
                                            // className="time flex border container flex-col"
                                            className={item.senderName === authedUser.username ? "time flex border container flex-col darker" : "time flex border container flex-col"}
                                            style={{
                                                // border: "black !important",                                                // justifyContent: item.senderName === authedUser.username ? "flex-start" : "flex-end",
                                                color: item.senderName === authedUser.username ? "black" : "midnightblue",
                                            }}
                                        >

                                            <div>

                                                <p style={{
                                                    float: item.senderName === authedUser.username ? "left" : "right", color: "dodgerblue"
                                                }}>

                                                    {item.senderName}
                                                </p>

                                                {/* <img className="chatImg"
                                                src={item.senderName === authedUser.username ? "http://localhost:8080/public/images/650c6e3e7575af11f04ea6ca/pexels-pixabay-327509.jpg" : null}
                                                style={{
                                                float: item.senderName === authedUser.username ? "left" : "right"}}></img> */}
                                            </div>

                                            <div>
                                                <p style={{
                                                    float: item.senderName === authedUser.username ? "right" : "left"
                                                }}>
                                                    {/* justifyContent: item.senderName === authedUser.username ? "flex-start" : "flex-end"}}> */}

                                                    {item.messageContent}
                                                </p>
                                            </div>
                                            <div>
                                                {/* <br/> */}
                                                <span className="time-right"
                                                    style={{
                                                        float: item.senderName === authedUser.username ? "right" : "left"
                                                    }}
                                                > {convertDate(item.createdAt)}</span>
                                                {/* {convertDate(item.createdAt)} */}
                                            </div>
                                        </div>

                                        {/* <div
                                            className="hide"
                                            style={{
                                                textAlign: item.senderName === authedUser.username ? "start" : "end",
                                            }}
                                        >{convertDate(item.createdAt)}

                                        </div> */}

                                        {/* <br /> */}

                                    </div>
                                )
                            })}
                        </div>
                    )
                    :
                    (
                        <p>none</p>
                    )}

                <div style={{ height: '100px' }}>
                </div>
                <div id="chat"></div>
            </div>
            <form>

                <div>{typing ? <p> typing...</p> : null}</div>


                <div className="flex flex-between">
                    {/* 
<MessagesFooter handleDeleteAll={handleDeleteAll} handleSubmitMessage={handleSubmitMessage} handleSetMessage={handleSetMessage} message={message}/> */}
                    <input
                        // style={{width: "80%"}}
                        type="text"
                        value={message.messageContent || ""}
                        onChange={(e) => handleSetMessage(e)}
                    ></input>

                    <button
                        disabled={message.messageContent ? false : true}
                        onClick={(e) => handleSubmitMessage(e)}>Send </button>
                    <button onClick={(e) => handleDeleteAll(e)}>Purge </button>

                </div>
            </form>
        </div>
    )
};

export default Messages




// const Messages = () => {

//     const { id } = useParams()


//     const { messages, authedUser } = useData()

//     const queryId = [authedUser._id, id].sort().join("")

//     const [allMsg, setAllMsg] = useState({})
//     const payload = { queryId: queryId }

//     const [message, setMessage] = useState({})

//     useEffect(() => {

//         axios({
//             method: 'POST',
//             withCredentials: true,
//             url: "http://localhost:8080/api/getAllMessages",
//             data: payload

//         })
//             .then(res => {
//                 console.log("res")
//                 handleSetAllMsg(res)

//             })
//             // .then(res => setMsg(res))
//             // .then(res => Object.keys(res.data).length ? handleSetMessages(res) : handleSetMessages())
//             // .then(() => setIsLoading(false))
//             .catch(err => console.log("err", err))

//     }, [])

//     const handleSetAllMsg = (input = {}) => {
//         console.log("handleSetAllMsg", input)
//         setAllMsg(input)
//     }

    // const handleSetMessage = (e) => {

    //     setMessage(prev => ({
    //         ...prev,
    //         sender: authedUser._id,
    //         senderName: authedUser.username,
    //         recipient: id,
    //         messageContent: e.target.value,
    //         read: [authedUser._id],
    //         queryId: queryId
    //     }))
    // }

    // const handleSubmitMessage = (e) => {
    //     e.preventDefault()

    //     axios({
    //         method: "POST",
    //         url: "http://localhost:8080/api/addMessage",
    //         data: message
    //     })
    //         .then(res => {
    //             console.log("res-message", res)
    //         })

    // }



    //////////////////////////////

//     <div key={i} id={i}
//     className="chat container"
// >

//     <div className="time flex border"
//         style={{
//             justifyContent: item.senderName === authedUser.username ? "flex-start" : "flex-end",
//             color: item.senderName === authedUser.username ? "red" : "green",
//         }}
//     >
//         {item.messageContent}
//     </div>

//     <div
//         className="hide"
//         style={{
//             textAlign: item.senderName === authedUser.username ? "start" : "end",
//         }}
//     >{convertDate(item.createdAt)}

//     </div>

//     <br />

// </div>