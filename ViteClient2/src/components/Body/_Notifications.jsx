import React, { useState } from 'react'
import { useData } from "../hooks/context-hook"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import convertDate from "../util/convertDate"

import expandComments from "../util/expandComment"

////////////////////
import Comments from "./Comments"
import FeedNotification from "./FeedNotification"
/////////////////


const Notifications = () => {

    const { profile, handleUpdateProfile, authedUser, handleNestedPath } = useData()

    // const [notification, setNotification] = useState()

    
    let notice = []
    
    ///////////////////////////////////////
    const { id } = useParams()
    const [comment, setComment] = useState()
    const [feed, setFeed] = useState({})

    //////////////////////////////


///////////////////////////////////
    const handleGetComment = (e, input) => {
        console.log("get comment", input)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/notification/comment/${input}`
        })
            .then(res => {
                console.log("res", res)
                // setComment(res.data[0])handleNestedPath
                handleNestedPath(res.data[0].nestedPath)
            })
            .catch(err => console.log("err", err))
        // expandComments(input)
    }
///////////////////////////////////////

    const handleDeleteNotice = (e) => {

        axios({
            method: 'POST',
            withCredentials: true,
            url: 'http://localhost:8080/api/removeNotice',
            data: { index: e.target.id }
        })

            // SET context state with updated profile once notice is removed from array
            .then(res => handleUpdateProfile(res))
            .catch(err => console.log("err", err))
    }
    if (profile.data) {

        if (profile.data.notifications) {

            notice = profile.data.notifications.map((item, i) => ({ ...item, i }))
        }

    }
    // notice = profile.data.notifications.map((item, i) => ({ ...item, i }))


    ////  GRAB og feed and renderr to page
    const handleTest = (e, input) => {

        console.log("hadnle test", input)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/notification/feed/${input}`
        })
            .then(res => {
                console.log("res", res)
                // setComment(res.data[0])handleNestedPath
                // handleNestedPath(res.data[0].nestedPath)
                setFeed(res)
            })
            .catch(err => console.log("err", err))
        // expandComments(input)




    }


    return (
        <div id='Notifications' className="flex flex-col">
            {/* {console.log("NOTIF profile", profile.data.notifications.map((item, i) => ({ ...item, i })))} */}
            {/* {console.log("notification state", notification)} */}
            {console.log("NOTIF - profile-context", profile)}
            {/* {console.log("notice", notice.map((obj) => Object.keys(obj)))} */}
            {/* {console.log("noticve", profile.data.notifications.map((item, i) => ({...item, i})).filter((obj) => Object.keys(obj) == "like"))} */}
            {console.log("feed", feed)}
            {console.log("notice", notice)}
            {console.log("comment", comment)}
            <div>

                <p className="flex flex-center"> Notifications </p>
                <div className="flex flex-center flex-between">

                    <p>all</p>
                    <p>likes</p>
                    <p>comments</p>
                    <p>messages</p>
                    <p>friend requests</p>
                </div>
            </div>

            {Object.keys(feed).length ?
                (

                    <FeedNotification propFeed={feed} />

                )
                :
                (
                    notice.length
                        ?
                        (
                            <div>
                                <div className="border">
                                    <p className="flex flex-center"> Likes </p>
                                    {/* {profile.data.notifications.filter((obj) => Object.keys(obj) == "like").map((item) => { */}
                                    {notice.filter((obj) => Object.keys(obj)[0] === "like").map((item, i) => {
                                        console.log("LIKE item", item)
                                        return (
                                            <div key={i}>
                                                <div>
                                                    <p>

                                                        <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.like.userId}> {` ${item.like.user} `} </Link>
                                                        liked your
                                                    <Link style={{ textDecoration: "none", font: "black" }} to={`/feednotification/${item.like.ogFeed}#${item.like.likedDoc}`}> comment </Link>   {convertDate(item.like.createdAt)}


                                                        <i className="fas fa-skull-crossbones"
                                                            style={{ float: "right" }}
                                                            id={item.i}
                                                            onClick={(e) => handleDeleteNotice(e)}
                                                        >
                                                            {/* Delete notice? */}
                                                        </i>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <br />
                                <div className="border">
                                    <br />
                                    <p className="flex flex-center">Comments</p>
                                    {notice.filter((obj) => Object.keys(obj)[0] === "comment").map((item, i) => {
                                        // {profile.data.notifications.filter((obj) => Object.keys(obj) == "comment").map((item) => {
                                        // console.log("Comment-item", item)
                                        return (
                                            <div key={i}>
                                                <div>
                                                    <p>
                                                        <Link
                                                            style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.comment.authorId}> {` ${item.comment.author} `}
                                                        </Link>

                                                        :  {item.comment.comment} ` :
                                                        <Link to={`/feednotification/${item.comment.ogFeed}#${item.comment.parentDoc}`}> about your post
                                                         </Link>

                                                        {convertDate(item.comment.createdAt)}

                                                        <i className="fas fa-skull-crossbones"
                                                            style={{ float: "right" }}
                                                            id={item.i}
                                                            onClick={(e) => handleDeleteNotice(e)}
                                                        >
                                                            {/* Delete notice? */}
                                                        </i>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>

                        )
                        :
                        (
                            <p>nothing new...... maybe you should do some stuff</p>
                        )

                )
            }


            <div>

            </div>


        </div>
    )
};

export default Notifications
