import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import convertDate from "../../../util/convertDate"
import io from 'socket.io-client'
import { useParams, useLocation } from 'react-router-dom'

const socket = io.connect('http://localhost:8080')

const CommentsNotification = ({ obj, item, i, handleAddFollow, authedUser, trackFeed, handleSetFeeds, expandFeed, lilNest }) => {

    // const [trackId, setTrackId] = useState("")
    const [viewComments, setViewComments] = useState(false)
    const [AddView, setAddView] = useState(false)

    const [newComment, setNewComment] = useState({
        newComment: ""
    })

    const { id } = useParams()

    const location = useLocation()


    // useEffect(() => {

    //     let go = document.getElementById(location.hash.substring(1))
    //     // console.log("go", location.hash.substring(1))
    // }, [location.hash])


    const handleAddView = (e) => {
        console.log("e.target", e)
        AddView ? setAddView(false) : setAddView(true)
    }


    const handleAddLike = (e) => {
        e.preventDefault()
        console.log("add like", e.target.id, e.target.attributes.name)
        console.log("like target", e.target)


        let payload = { id: e.target.id, type: e.target.attributes.name.value }
        console.log("like payload", payload)

        axios({
            method: "POST",
            url: "http://localhost:8080/api/addLike",
            data: payload,
            withCredentials: true
        })
            .then(added => {
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
                console.log("added", added.data)
                handleSetFeeds(added.data)
                // getFeeds(trackFeed)
                if (added.data._id) {
                    socket.emit("activity", added.data.authorId)
                }
            })
            .catch(err => console.log("err", err))


        ////   EXTRA axios to rerend initial feed to show comment count and vote count LIVE

        axios({
            method: "GET",
            url: `http://localhost:8080/api/notification/feed/${id}`,
            withCredentials: true
        })
            .then(got => {
                console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                console.log("LOADED!!!!")
            })
            // .then(() => setLoading(false))
            .catch(err => console.log("err", err))

    }


    const handleNewComment = (e) => {
        console.log("addnewComment", e.target)
        // console.log("handleNew Comment item", item )
        setNewComment(prev => ({
            ...prev,
            content: e.target.value,
            OgFeed: e.target.id, // OG Feed ID]\
            parent: item._id, // Parent Comment
            authorId: authedUser._id,
            authorName: authedUser.username,
            created: new Date(),
            // ogAuthor: e.target.name,
            // parentAuthor: e.target.name, // ONLY GETTIONG OG AUTHOR.... need parent author
            parentAuthor: item.authorId, // ONLY GETTIONG OG AUTHOR.... need parent author
            likes: 0,
            type: e.target.attributes.name,
            parentdoc: e.target.attributes.parentdoc.value,
            nestLevel: 1
            // parentAuthor: item.authorId
        }))
    }




    const handleAddComment = (e) => {
        console.log("sending payload", newComment)
        // console.log("add comment e.target.", e.target)
        axios({
            method: "POST",
            url: "http://localhost:8080/api/addCommentComment",
            data: newComment
        })
            .then(added => {
                console.log("Comment notif added", added)
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
                socket.emit("activity", added.data._id)
            })
            .catch(err => console.log(err))
        // setViewNewComment(false)
        setNewComment({})
        // handleViewNewComment()
        handleAddView()


        ////   EXTRA axios to rerend initial feed to show comment count and vote count LIVE
        axios({
            method: "GET",
            url: `http://localhost:8080/api/notification/feed/${id}`,
            withCredentials: true
        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                console.log("LOADED!!!!")
            })
            // .then(() => setLoading(false))
            .catch(err => console.log("err", err))
    }


    const handleViewComments = (e) => {
        console.log("handleviewcomment", e.target.id)
        // setTrackId(e.target.id)
        viewComments ? setViewComments(false) : setViewComments(true)
    }

    return (

        <div
            key={i}
            data_id={item._id}
            id="comments"
            className=" comments comment "
            // style={{ backgroundColor:  "red" }}
            // style={{ backgroundColor: item._id === location.hash.substring(1) ? "whitesmoke" : null }}
        >
            {/* {console.log("useLoc", location.hash.substring(1))} */}

            <div className="flex"
                style={{ justifyContent: "space-between" }}
            >
                <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + item.authorId}> {`${item.authorName}`} </Link>

                <i className="fas fa-people-arrows"
                    id={item.authorId}
                    onClick={(e) => handleAddFollow(e)}
                >

                    {/* -Follow User- */}
                </i>

                <p>
                    {convertDate(item.createdAt)}
                </p>
            </div>
            <br />
            {/* //// ADD SSYTLE conditional here..... for notificatoin RENDER */}
            <div id='commentContent'>
                <p>{item.content}</p>
                <br />
            </div>
            <br />

            <div
                style={{ justifyContent: "space-between", alignContent: "flex-end" }}
                className="flex flex-row">

                <i className="far fa-heart  "
                > {item.likes}</i>
                {/* {console.log("like item, ", item)} */}
                <i className="fas fa-hand-holding-heart  "
                    name="comment"
                    id={item._id}
                    onClick={(e) => handleAddLike(e)}>
                </i>



                <i className="far fa-comments"

                    id={item._id}
                    onClick={(e) => handleViewComments(e)}>  {item.commentCount}
                </i>
                {/* {console.log("itemAuth", item.authorId)}
                {console.log("obj", obj)}
                {console.log("item", item)} */}

                {item.parentAuthor === authedUser._id
                    ?
                    (<p
                        id={item._id}
                        type="comment"
                        name={item.author}  // access to the original feed author to use for notificatons....
                        onClick={(e) => handleAddView(e)}>  Reply
                            </p>
                    )
                    :
                    (
                        // <p
                        <i className="fab fa-rocketchat"

                            id={item._id}
                            type="comment"
                            name={item.author}  // access to the original feed author to use for notificatons....
                            onClick={(e) => handleAddView(e)}>
                        </i>
                        //    {/* </p> */}
                    )
                }
            </div>

            {/* ADD COMMENT AREA */}
            <br />
            {AddView ? (

                <div className="flex center"
                >
                    {/* {console.log("obj add comment", obj)}
                    {console.log("item id for author", item.author)} */}


                    <input
                        style={{ width: "700px" }}
                        id={obj._id} //  Feed ID
                        parentdoc={item._id}
                        placeholder="Add comment"
                        name={obj.author} // Access to OG author for notificaton on comments..
                        value={newComment.content || ""}
                        onChange={(e) => handleNewComment(e)}
                    >

                    </input>

                    <button style={{ height: "25px", marginBottom: "20px", marginTop: "20px" }}

                        onClick={handleAddComment}>Add</button>

                </div>

            ) : (null)}


            {/* <div className="test" > */}

                {/* nested comment render */}
                {/* {console.log("ITEM", item)} */}
                {/* {(viewComments && obj._id === trackId) && obj.comments.map((item, i) => { */}

                {/* {item.comments */}
                {/* {(viewComments && item._id === trackId) && item.comments.map((item, i) => { */}
                {item.comments.map((item, i) => {

                    return (
                        <div  id="comment-comment" >
                            {/* <br /> */}
                            <CommentsNotification
                                authedUser={authedUser}
                                item={item}
                                key={i}
                                obj={obj}
                                i={i}
                                handleAddFollow={handleAddFollow}
                                handleAddLike={handleAddLike}
                                // handleGetNewFeeds={handleGetNewFeeds}
                                // getFeeds={getFeeds}
                                handleSetFeeds={handleSetFeeds}
                                trackFeed={trackFeed}
                            // nestedPath={nestedPath}
                            />
                            <br />
                        </div>
                    )
                })}




            {/* </div> */}
        </div>
    )
};

export default CommentsNotification
