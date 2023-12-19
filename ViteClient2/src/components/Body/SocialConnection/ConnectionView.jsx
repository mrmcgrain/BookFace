import { useData } from "../../../hooks/context-hook/"
import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'

import io from 'socket.io-client'
import axios from "axios"

const socket = io.connect('http://localhost:8080')

const ConnectionView = () => {

    const { profile, messages, authedUser, handleUpdateProfile } = useData()

    const [friendList, setFriendList] = useState({})

    const [searchFriends, setSearchFriends] = useState("")

    const [filter, setFilter] = useState("approved")

    const handleSearchFriends = (e) => {
        setSearchFriends(e.target.value)
    }

    useEffect(() => {

        axios({
            method: "GET",
            url: "http://localhost:8080/api/getFriends",
            withCredentials: true
        })
            .then(found => {
                console.log("found", found)
                setFriendList(found.data)
            })
            .catch(err => console.log("err", err))

    }, [])


    return (

        <div id='ConnectionView'>
            {/* {console.log("FriendsList", searchFriends)} */}

            <section className="flex" style={{ justifyContent: "space-evenly" }}>
                <div onClick={(e) => setFilter("approved")}>Friends {profile && profile.data && profile.data.friends.filter((status) => status.friend === 'approved').length}
                </div>
                <div>|</div>
                <div onClick={(e) => setFilter("pending")}>Pending{profile && profile.data &&profile.data.friends.filter((status) => status.friend === 'pending').length}</div>
                <div>|</div>
                <div onClick={(e) => setFilter("requested")}>Requests
                 {profile && profile.data && profile.data.friends.filter((status) => status.friend === 'requested').length}</div>
                <div>|</div>
                <div>
                    <Link to="/searchUsers">


                        Find New
                    </Link>
                </div>
            </section>

            <br />

            <section>
                <input
                    onChange={(e) => handleSearchFriends(e)}
                    placeholder="Search Friends"></input>
            </section>

            <br />

            <section id="ConnectionContentContainer">

                {searchFriends ? (

                    // console.log(friendList.filter((name) => name.userName.includes(searchFriends)))
                    friendList.filter((name) => name.userName.includes(searchFriends)).map((obj, i) => {
                        return (
                            <div id="ConnectionList"
                                // style={{ marginLeft: "20%" }}
                                key={i}
                            >

                                <div style={{ width: '100px' }}>

                                    {obj.userId.profileImg ? (

                                        <img
                                            id={obj.userId._id}
                                            className="messgeProfile" src={`http://localhost:8080${obj.userId.profileImg}`}>
                                        </img>
                                    )
                                        :
                                        (
                                            <img
                                                id={obj.userId._id}
                                                className="messgeProfile" src={`http://localhost:8080/public/defaultImg.png`}></img>
                                        )}


                                </div>

                                <div style={{ width: '170px', textAlign: "left" }}>
                                    <Link style={{ textDecoration: "none" }} key={i} to={"/users/profile/" + obj.userId._id}> {obj.userName} </Link>
                                </div>
                                <div style={{ width: '100px' }}>

                                    <Link style={{ textDecoration: "none" }} key={i} to={"/messages/" + obj.userId._id + "/" + obj.userName} > chat </Link>


                                </div>

                            </div>
                        )
                    })

                ) : (



                        <div>
                            {Object.keys(friendList).length
                                ?
                                (
                                    friendList.filter((status) => status.friend === filter).map((obj, i) => {
                                        return (
                                            <div id="ConnectionList"
                                                // style={{ marginLeft: "20%" }}
                                                key={i}
                                            >
                                                <div style={{ width: '100px' }}>

                                                    {obj.userId.profileImg ? (

                                                        <img
                                                            id={obj.userId._id}
                                                            className="messgeProfile" src={`http://localhost:8080${obj.userId.profileImg}`}>
                                                        </img>
                                                    )
                                                        :
                                                        (
                                                            <img
                                                                id={obj.userId._id}
                                                                className="messgeProfile" src={`http://localhost:8080/public/defaultImg.png`}></img>
                                                        )}


                                                </div>

                                                <div style={{ width: '120px', textAlign: "left" }}>
                                                    <Link style={{ textDecoration: "none" }} key={i} to={"/users/profile/" + obj.userId._id}> {obj.userName} </Link>
                                                </div>



                                                <div style={{ width: '100px' }}>

                                                    <Link style={{ textDecoration: "none" }} key={i} to={"/messages/" + obj.userId._id + "/" + obj.userName} > chat </Link>
                                                </div>


                                                <div style={{ width: "40px" }}>
                                                    {obj.userId.isOnline ? (
                                                        <p style={{ color: "lime" }}>

                                                            online
                                                    </p>
                                                    ) : (null)}

                                                </div>
                                            </div>
                                        )
                                    })
                                )
                                :
                                (null)}
                        </div>
                    )}




            </section>

        </div>
    )
};

export default ConnectionView
