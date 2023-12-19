import { useData } from "../../../hooks/context-hook"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import convertDate from "../../../util/convertDate"

const socket = io.connect('http://localhost:8080')

const Messages = () => {


    const { authedUser, profile } = useData()
    const { id , user} = useParams()
    let queryId = [authedUser._id, id].sort().join("")

    const payload = { queryId: queryId }
    const [message, setMessage] = useState({})
    const [typing, setTyping] = useState(false)
    const [allMsg, setAllMsg] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        socket.emit('join_room', queryId)

    }, [queryId])


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
            console.log("socket Data", data)
            // console.log("in soccket all msg", allMsg)

            setAllMsg(prev => ([
                ...prev,
                data
            ]))

            let newChat = document.getElementById("chat");
            newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })

        })

        return () => socket.off('recieve_message')

    }, [socket])

    useEffect(() => {
console.log("USEEFF HIT")
        axios({
            method: 'POST',
            withCredentials: true,
            url: "http://localhost:8080/api/getThreadMessages",
            data: payload
        })
            .then(res => {
                console.log("res", res)
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


    const handleSetMessage = (e) => {

    
        setMessage(prev => ({
            ...prev,
            sender: authedUser._id,
            senderName: authedUser.username,
            recipient: id,
            messageContent: e.target.value,
            read: [authedUser._id],
            queryId: queryId,
            createdAt: new Date(),
            profileImg: profile.data.profileImg,
            deleted: []

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





    return (
        <div id='Messages' className="profileBody">
            {/* {console.log("socket:", socket)} */}
            {/* {console.log("message", message)} */}
            {console.log("allmsgs", allMsg)}
            {/* {console.log("typeof(allmsg)", typeof (allMsg))} */}
            {/* {console.log("newMsg", newMsg)} */}
            {/* {console.log("filter", allMsg.map((item).filter((item) => item.read.includes(item.recipient)) } */}
            {/* <div> <a href="#chat">test</a></div> */}
            {console.log("Messages Render", authedUser._id)}
            {/* {console.log("allmsg", allMsg)} */}
            {/* {console.log("test", test)} */}
            {/* {console.warn("Message - user test", user)} */}

            {/* <div> <a href={`#${allMsg.length - 1}`}>test</a></div> */}
            <div>

                <p className="flex flex-center border"> {user} </p>
            </div>

            <div className="messageView">
                {allMsg.length
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

                <div id="chat"></div>
            </div>
                <div style={{ height: '20px' }}>
                    {/* <div> */}
                    {typing ? <p> typing...</p> : null}
                    {/* </div> */}

                </div>
            <form>



                <div id="messagesActions" className="flex flex-between">
                    
                    {/* 
                    
<MessagesFooter handleDeleteAll={handleDeleteAll} handleSubmitMessage={handleSubmitMessage} handleSetMessage={handleSetMessage} message={message}/> */}
                    <textarea
                        id="messageInput"
                        // style={{width: "80%"}}
                        type="text"
                        value={message.messageContent || ""}
                        onChange={(e) => handleSetMessage(e)}
                    ></textarea>

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