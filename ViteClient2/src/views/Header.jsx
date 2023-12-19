import { useData } from "../hooks/context-hook"
// import Login from "../comps/Login"
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Nav from "../components/Header/Nav"
import axios from 'axios'

import io from 'socket.io-client'


const socket = io.connect('http://localhost:8080')

const Header = () => {

    const { authedUser, messages, CheckAuthUser, handleMessageCount, handleSetAuthedUser, FullReset, profile, handleUpdateProfile } = useData()

    const { id } = useParams()
    
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
        e.preventDefault()
        axios({
            method: "PUT",
            withCredentials: true,
            url: "http://localhost:8080/user/logout"
        })
            .then(res => {

                console.log("loggedout", res)
                handleSetAuthedUser()
                socket.emit("loggedOut", "loggedOut")
                FullReset()
                nav('/')
            })
            .catch(err => console.log("err", err))
    }


    return (

        <div id="Header" style={{ height: "5vh" }}
        // className="border flex"
        >
            {console.log("Header Render")}
            {/* <div className="HeaderBackGround" > */}
            {/* LOGO HERE */}

            {authedUser ? (

                <section

                    className="HeaderBackGround"

                >

                    <div className="HeaderBackGround"
                        style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>


                        <div>
                            <Link style={{ fontSize: "26px" }} className="fas fa-home HeaderIcons" to={`/landing/${authedUser._id}`}></Link>
                        </div>

                        <div >
                            <Link style={{ fontSize: "26px" }} className="fas fa-user HeaderIcons" to={`/profile/${authedUser._id}`}></Link>
                        </div>

                        <Link to={`/messaging/${authedUser._id}`} >
                            <div 
                            // style={{border: 'solid blue 2px', borderRadius: '20px', height: '20px', width: '20px', }} 
                            id="mailCallCount" >
                                {handleMessageCount()}

                            </div>
                            <Link style={{ fontSize: "26px" }} className="fas fa-envelope HeaderIcons" to={`/messaging/${authedUser._id}`}></Link>
                        </Link>

                        <Link to={`/notifications/${authedUser._id}`} >
                            {/* {profile?.data?.notifications.length ? profile.data.notifications.length : 0} */}
                            <div id="notificationCounter">

                                {(profile.data && profile.data.notifications) &&profile.data.notifications.length ? profile.data.notifications.length : null}
                            </div>

                            <Link style={{ fontSize: "26px" }} className="fas fa-bolt HeaderIcons" to={`/notifications/${authedUser._id}`}>  </Link>

                        </Link>
                        <div>
                            <Link style={{ fontSize: "26px" }} className="fas fa-users HeaderIcons" to="/socialConnections"></Link>                        </div>

                        <div >
                            <Link style={{ fontSize: "26px" }} className="fab fa-less HeaderIcons" to="/" onClick={(e) => handleLogout(e)}> </Link>

                        </div>

                    </div>

                </section>
                // <Link to="/" >Logo Here</Link>
            ) : (
                    // <Nav /> 
                    <Link to="/" >Logo Here</Link>

                )}

            {/* <p onClick={CheckAuthUser}>check auth</p> */}

            {/* <div className="HeaderBackGround" > */}


            {/* </div> */}
            {/* </div> */}



        </div>


    )
};

export default Header
