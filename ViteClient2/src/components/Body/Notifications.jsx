
import React, { useState } from 'react'
import { useData } from "../../hooks/context-hook"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import convertDate from "../../util/convertDate"
import truncate from "../../util/truncate"

const Notifications = () => {

    const { profile, handleUpdateProfile, authedUser } = useData()



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

    let notice = []
    let likeCount
    let CommentCount
    let photoLikeCount
    let photoCommentCount
    let photoTagCount

    if (profile.data) {

        if (profile.data.notifications) {

            notice = profile.data.notifications.map((item, i) => ({ ...item, i }))

            likeCount = notice.filter((obj) => Object.keys(obj)[0] === "like").length
            console.log("likeCount", likeCount)

            CommentCount = notice.filter((obj) => Object.keys(obj)[0] === "comment").length
            console.log("CommentCount", CommentCount)

            photoLikeCount = notice.filter((obj) => Object.keys(obj)[0] === "PhotoLike").length
            console.log("photoLike", photoLikeCount)

            photoCommentCount = notice.filter((obj) => Object.keys(obj)[0] === "PhotoComment").length
            console.log("photoComment", photoCommentCount)

            photoTagCount = notice.filter((obj) => Object.keys(obj)[0] === "photoTag").length
            console.log("photoTag", photoTagCount)
        }

    }


    return (

        <div id='Notifications' className="flex profileBody">
            {console.log("notifs", notice)}
            {/* {console.log("comment Count", Object.keys(obj)[0] === "like")} */}
            <div id="NotificationActions">

                <p> Comments {CommentCount}</p>
                <p> | </p>
                <p> Likes {likeCount}</p>
                <p> | </p>
                <p> Photo Like {photoLikeCount}  </p>
                <p> | </p>
                <p> Photo Comment {photoCommentCount} </p>
            </div>
            <br />
            <div>
                {notice.length
                    ?
                    (
                        <div>
                            <div className="border">
                                <p className="flex flex-center">Comment Likes </p>
                                {/* {profile.data.notifications.filter((obj) => Object.keys(obj) == "like").map((item) => { */}
                                {notice.filter((obj) => Object.keys(obj)[0] === "like").map((item, i) => {
                                    console.log("LIKE item", item)

                                    return (
                                        <div key={i}>
                                            <div className="notificationInfo">
                                                {/* <p> */}
                                                <div>

                                                    <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.like.userId}> {` ${item.like.user} `} </Link>

                                                </div>
                                                <div>

                                                    <p>
                                                        liked your
                                                        </p>
                                                </div>
                                                <div>

                                                    <Link style={{ textDecoration: "none", font: "black" }} to={`/feednotification/${item.like.ogFeed}#${item.like.likedDoc}`}> comment </Link>
                                                </div>
                                                <div>

                                                    {convertDate(item.like.createdAt)}
                                                </div>

                                                <div>

                                                    <i className="fas fa-skull-crossbones"
                                                        style={{ float: "right" }}
                                                        id={item.i}
                                                        onClick={(e) => handleDeleteNotice(e)}
                                                    ></i>
                                                </div>

                                                {/* </p> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <br />

                            <div className="border">
                                <p className="flex flex-center">Comments</p>
                                {notice.filter((obj) => Object.keys(obj)[0] === "comment").map((item, i) => {
                                    // {profile.data.notifications.filter((obj) => Object.keys(obj) == "comment").map((item) => {
                                    // console.log("Comment-item", item)
                                    return (
                                        <div key={i}>
                                            <div className="notificationInfo">
                                                {/* <p> */}

                                                <div style={{ width: "80px" }}>
                                                    <Link
                                                        style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.comment.authorId}> {` ${item.comment.author} `}
                                                    </Link>
                                                </div>

                                                {/* <div style={{width: "150px", textAlign: "left"}}> 
                                                    :  {truncate(item.comment.comment)}` :
                                                    </div> */}
                                                <div style={{ width: "150px", textAlign: "left" }}>
                                                    <Link to={`/feednotification/${item.comment.ogFeed}#${item.comment.parentDoc}`}>   :  {truncate(item.comment.comment)}` :
                                                         </Link>
                                                </div>

                                                <div style={{ width: "70px" }}>
                                                    {convertDate(item.comment.createdAt)}
                                                </div>

                                                <div>
                                                    <i className="fas fa-skull-crossbones"
                                                        style={{ float: "right" }}
                                                        id={item.i}
                                                        onClick={(e) => handleDeleteNotice(e)}
                                                    >
                                                    </i>
                                                </div>                                                   {/* Delete notice? */}
                                                {/* </p> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <br />

                            <div className="border">
                                <p className="flex flex-center">Photo Likes </p>
                                {/* {profile.data.notifications.filter((obj) => Object.keys(obj) == "like").map((item) => { */}
                                {notice.filter((obj) => Object.keys(obj)[0] === "PhotoLike").map((item, i) => {
                                    

                                    return (
                                        <div key={i}>
                                            <div className="notificationInfo">
                                                {/* <p> */}
                                                <div>

                                                    <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.PhotoLike.userId}> {` ${item.PhotoLike.username} `} </Link>

                                                </div>
                                                <div>

                                                    <p>
                                                        liked your
                                                        </p>
                                                </div>
                                                <div>

                                                    <Link style={{ textDecoration: "none", font: "black" }} to={`${item.PhotoLike.path}`}> photo </Link>
                                                </div>
                                                <div>

                                                    {convertDate(item.PhotoLike.createdAt)}
                                                </div>

                                                <div>

                                                    <i className="fas fa-skull-crossbones"
                                                        style={{ float: "right" }}
                                                        id={item.i}
                                                        onClick={(e) => handleDeleteNotice(e)}
                                                    ></i>
                                                </div>

                                                {/* </p> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <br />
                            <div className="border">
                                <p className="flex flex-center">Photo Comments</p>
                                {notice.filter((obj) => Object.keys(obj)[0] === "PhotoComment").map((item, i) => {
                                    // {profile.data.notifications.filter((obj) => Object.keys(obj) == "comment").map((item) => {
                                    // console.log("Comment-item", item)
                                    console.log("Photo Comments", item)
                                    return (
                                        <div key={i}>
                                            <div className="notificationInfo">
                                                {/* <p> */}

                                                <div style={{ width: "80px" }}>
                                                    <Link
                                                        style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.PhotoComment.userId}> {` ${item.PhotoComment.username} `}
                                                    </Link>
                                                </div>

                                                {/* <div style={{width: "150px", textAlign: "left"}}> 
                                                    :  {truncate(item.comment.comment)}` :
                                                    </div> */}
                                                <div style={{ width: "150px", textAlign: "left" }}>

                                                    {/* <Link to={`${item.PhotoComment.path}`}> */}
                                                    <Link to={`/galleryNotification/${item.PhotoComment.ownerId}/gallery/${item.PhotoComment.comment.OgImage}#${item.createdId}`}>

                                                        :  {truncate(item.PhotoComment.comment.content)}` :
  
                                                         </Link>
                                                </div>

                                                <div style={{ width: "70px" }}>
                                                    {convertDate(item.PhotoComment.comment.created)}
                                                </div>

                                                <div>
                                                    <i className="fas fa-skull-crossbones"
                                                        style={{ float: "right" }}
                                                        id={item.i}
                                                        onClick={(e) => handleDeleteNotice(e)}
                                                    >
                                                    </i>
                                                </div>                                                   {/* Delete notice? */}
                                                {/* </p> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <br />
                            <div className="border">
                                <p className="flex flex-center">Photo Tags</p>
                                {notice.filter((obj) => Object.keys(obj)[0] === "photoTag").map((item, i) => {
                                    // {profile.data.notifications.filter((obj) => Object.keys(obj) == "comment").map((item) => {
                                    // console.log("Comment-item", item)
                                    return (
                                        <div key={i}>
                                            <div className="notificationInfo">
                                                {/* <p> */}

                                                <div style={{ width: "80px" }}>
                                                    <Link
                                                        style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.photoTag.userId}> {` ${item.photoTag.username} `}
                                                    </Link>
                                                </div>

                                                {/* <div style={{width: "150px", textAlign: "left"}}> 
                                                    :  {truncate(item.comment.comment)}` :
                                                    </div> */}
                                                <div style={{ width: "150px", textAlign: "left" }}>
                                                    <Link to={`${item.photoTag.path}`}>  tagged a photo
                                                         </Link>
                                                </div>

                                                <div style={{ width: "70px" }}>
                                                    {/* {convertDate(item.PhotoComment.comment.created)} */}
                                                </div>

                                                <div>
                                                    <i className="fas fa-skull-crossbones"
                                                        style={{ float: "right" }}
                                                        id={item.i}
                                                        onClick={(e) => handleDeleteNotice(e)}
                                                    >
                                                    </i>
                                                </div>                                                   {/* Delete notice? */}
                                                {/* </p> */}
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


                }


                <div>

                </div>


            </div>
        </div>
    )
};


export default Notifications
