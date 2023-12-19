import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useData } from "../../hooks/context-hook"
import { useParams } from 'react-router-dom'

import io from 'socket.io-client'


const socket = io.connect('http://localhost:8080')

const Nav = () => {

    const { id } = useParams()

    const { authedUser, handleSetAuthedUser, handleForceUpdate, handleUpdateProfile, profile, FullReset, messages, handleMessageCount } = useData()

    useEffect(() => {

        socket.on("updateNotification", data => {

            console.warn("socket nav update notice hit", data)
            if (data.includes(id)) {
                // if (data.includes(authedUser._id)) {

                console.warn("SHOULD Notif only update", authedUser._id)
                console.warn("SHOULD Notif only update - params work around", id)

                axios({
                    method: "GET",
                    url: "http://localhost:8080/profile",
                    withCredentials: true
                })
                    .then(res => {
                        console.log("res", res)
                        handleUpdateProfile(res)
                    })
                    .catch(err => console.log("err", err))
            }
        })

    }, [socket, id])


    useEffect(() => {

        socket.on("updateMail", data => {
            console.warn("socket nav updateMail  hit", data, authedUser._id)
            console.warn("sock authedUSer", authedUser._id)
            console.warn("sock param id", id)
            // if (data.includes(authedUser._id)) {
            if (data.includes(id)) {
                console.warn("SHOULD only  MAIL CALL update", authedUser._id)
                console.warn("SHOULD only MAIL CALL update =- param workaround", id)

                axios({
                    method: "GET",
                    url: "http://localhost:8080/profile",
                    withCredentials: true
                })
                    .then(res => {
                        console.log("Updating profile", res)
                        handleUpdateProfile(res)
                    })
                    .catch(err => console.log("err", err))
            }
        })


    }, [socket, id])


    let nav = useNavigate()


    const handleLogout = (e) => {

        axios({
            method: "PUT",
            withCredentials: true,
            url: "http://localhost:8080/user/logout"
        })
        handleSetAuthedUser()
        socket.emit("loggedOut", "loggedOut")
        FullReset()
        nav('/')
    }

    return (
        <div id='Nav' className="flex flex-col                 HeaderBackGround" 
        >

            {/* {console.log("Nav Render", profile.data.notifications.length)} */}
            {console.log("msgs", messages, authedUser._id)}
            {console.log("NAV params", id)}
            {/* <div> */}

            {authedUser.username
                ?

                (
                    // <div>


                    <div id="Nav" className="flex flex-row">
                        {/* <div>
                            <Link to={`/landing/${authedUser._id}`}>Home</Link>
                        </div> */}

                        {/* <i className="fas fa-home"></i> */}

                        <div className="notbubble">
                            <Link style={{ fontSize: "26px" }} className="fas fa-home" to={`/landing/${authedUser._id}`}></Link>
                        </div>
                        {/* <i className="fas fa-user"> */}

                        <div className="notbubble">
                            <Link style={{ fontSize: "26px" }} className="fas fa-user" to={`/profile/${authedUser._id}`}></Link>
                            {/* </i>   */}
                        </div>

                        {/* <Link to={`/sockettest`}>Notifications</Link> */}


                        {Object.keys(messages).length
                            ?
                            (
                                <div className="notbubble">
                                    {/* {Object.keys(messages.data) ? Object.keys(messages.data).length : 0} */}

                                    {/* handleMessageCount is from context to display unread messages..... */}

                                    {/* {handleMessageCount()}
                                    <Link style={{ fontSize: "26px" }} className="fas fa-envelope" to={`/messaging/${authedUser._id}`}></Link> */}


                                </div>
                            )
                            :
                            (
                                null
                            )}
                        {/* <div>
                            <Link style={{ fontSize: "26px" }} className="fas fa-envelope" to={`/messaging/${authedUser._id}`}></Link>
                        </div> */}







                        {Object.keys(profile).length
                            ?
                            (
                                <div className="notbubble">

                                    {profile.data.notifications.length ? profile.data.notifications.length : 0}

                                    <Link style={{ fontSize: "26px" }} className="fas fa-bolt" to={`/notifications/${authedUser._id}`}>  </Link>
                                </div>

                            )
                            :
                            (
                                null
                            )
                        }


                        <div className="notbubble">
                            <Link style={{ fontSize: "26px" }} className="fas fa-users" to="/socialConnections"></Link>
                            {/* <p>Find Friends</p> */}

                        </div>
                        
                        <div className="notbubble">


                            <Link style={{ fontSize: "26px" }} className="fab fa-less" to="/" onClick={(e) => handleLogout(e)}> </Link>
                        </div>
                    </div>
                    // {/* </div> */}
                )
                :

                (
                  null
                )
            }
            {/* </div> */}
        </div>
    )
};

export default Nav
