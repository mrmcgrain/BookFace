import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import convertDate from "../../../util/convertDate"
import io from 'socket.io-client'
import { useData } from "../../../hooks/context-hook"
// import ViewProfileGalleryComments from "./ViewProfileGalleryComments"

const socket = io.connect('http://localhost:8080')


// useEffect(() => {

//     let newChat = document.getElementById("scroll");
//     newChat.scrollIntoView({ behavior: 'smooth', block: 'end', inline: "nearest" }) 
//     // kk
// const element = document.getElementById("content");
// element.scrollIntoView();
// }, [])

const ViewProfileGalleryComments = ({
    obj,
    item,
    i,
    // authedUser,
    handleAddLike,
    handleSetPhoto,
    setRender,
    render
}) => {

const nav = useNavigate()
const loc = useLocation()

const { authedUser } = useData()

// useEffect(() => {

//     let tagged = document.getElementById("TEST")
//     tagged.scrollIntoView({ behavior: 'smooth', block: 'end' })

// }, [])


const [viewComments, setViewComments] = useState()
const [AddView, setAddView] = useState(false)

useEffect(() => {

    let tagged = document.getElementById("TEST")
console.log("tag scroll", tagged)
    if(tagged){

    tagged.scrollIntoView({ behavior: 'smooth', block: 'start' })
    console.log("Should Scroll to bottom")
}

}, [viewComments, AddView])



    const { id, img } = useParams()

    const [trackId, setTrackId] = useState("")

    const [newComment, setNewComment] = useState({
        newComment: ""
    })

    const handleAddView = (e) => {
        console.log("AddView HIT")
        AddView ? setAddView(false) : setAddView(true)
        setViewComments(false)
        // setTimeout(() => {
        //     scrollTo(document.getElementById('TEST'))   
        //     console.log("should of Scrolled")
        //        }, 50);
    }

    // const handleAddLike = (e) => {
    //     e.preventDefault()
    //     // console.log("add like", e.target.id, e.target.attributes.name.value, e.target.attributes.type.value)
    //     // console.log("like target", e.target, "COMMENT ADD LIKE")
    //     console.warn("Comment add like")

    //     let payload = { id: e.target.id,  type: e.target.attributes.type.value,
    //     }
    //     console.log("like payload", payload)

    //     axios({
    //         method: "POST",
    //         url: "http://localhost:8080/api/users/gallery/addLike/comment/",
    //         data: payload,
    //         withCredentials: true
    //     })
    //         .then(added => {
    //             // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
    //             console.log("added", added.data)
    //             // getFeeds(trackFeed)
    //         })
    //         .catch(err => console.log("err", err))

    //     // socket.emit("activity", "Like")
    //     // socket.emit("activity", e.target.attributes.name.value)

    //     ////   EXTRA axios to rerend initial feed to show comment count and vote count LIVE

    //     // axios({
    //     //     method: "GET",
    //     //     url: `http://localhost:8080/api/${trackFeed}`,
    //     //     withCredentials: true
    //     // })
    //     //     .then(got => {
    //     //         // console.log("got feeds", got.data)
    //     //         // handleSetFeeds(got.data)
    //     //         // setFeeds(prev => ({ ...prev, got }))
    //     //         console.log("LOADED!!!!")
    //     //     })
    //     //     // .then(() => setLoading(false))
    //     //     .catch(err => console.log("err", err))

    // }


    const handleNewComment = (e) => {
        // console.log("addnewComment", e.target)
        // console.log("handleNew Comment item", item )
        setNewComment(prev => ({
            ...prev,
            content: e.target.value,
            OgImage: e.target.id, // OG Feed ID]\
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
        // console.log("sending payload", newComment)
        // console.log("add comment e.target.", e.target)

        const payload = {

            PhotoComment: {
                path: "http://localhost:5173/users/profile/" + id + "/gallery/" + img,
                username: authedUser.username,
                userId: authedUser._id,
                ownerId: id,
                comment: newComment,
                // nestPath: img,
                OgImage: img,
                nestLevel: 0,
                parentdoc: img
            }
        }

        axios({
            method: "POST",
            url: "http://localhost:8080/api/users/gallery/addCommentComment",
            data: payload
        })
            .then(added => {
                // console.log("added", added)
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
                handleSetPhoto(added.data)
                socket.emit("activity", added.data._id)
            })
            .catch(err => console.log(err))
        // setViewNewComment(false)
        setNewComment({})
        // handleViewNewComment()
        handleAddView()
        setRender(!render)

        ////   EXTRA axios to rerend initial feed to show comment count and vote count LIVE
        // axios({
        //     method: "GET",
        //     url: `http://localhost:8080/api/${trackFeed}`,
        //     withCredentials: true
        // })
        //     .then(got => {
        //         // console.log("got feeds", got.data)
        //         handleSetFeeds(got.data)
        //         // setFeeds(prev => ({ ...prev, got }))
        //         console.log("LOADED!!!!")
        //     })
        //     // .then(() => setLoading(false))
        //     .catch(err => console.log("err", err))
    }


    const handleViewComments = (e, input) => {
        // console.log("handleviewcomment", input)
        // setTrackId(e.target.id)
        setTrackId(input)
        viewComments ? setViewComments(false) : setViewComments(true)
        setAddView(false)
        // setAddView(!AddView)/
        // element.scrollIntoView({ block: "end" });
        // let scrollIt = document.getElementById("e.target.id");
        //     newChat.scrollIntoView({ behavior: 'smooth', block: 'end', inline: "nearest" }) 
        //     // kk
        // const element = document.getElementById("content");
        // scrollIt.scrollIntoView();
        // nav()
    }


    return (
        // id='ViewProfileGalleryComments'>
        <div

            id="comments"
            className="comments comment"
            style={{ borderLeft: item.nestLevel > 0 ? `${item.nestLevel}px #646cff solid` : null }}
        >
            {/* {console.log("map OBJ", obj)} */}
            {console.log("map item", item)}
            {/* {console.log("loc", loc)} */}
            <div className="flex"
                id={item._id}
                style={{ justifyContent: "space-between" }}
            >
                <Link style={{ textDecoration: "none", font: "black" }} to={"/users/profile/" + item.authorId}> {`${item.authorName}`}
                </Link>

                <i className="fas fa-people-arrows"
                    id={item.author}
                // onClick={(e) => handleAddFollow(e)}
                >

                </i>
                {/* <p
                id={item.authorId}
                onClick={(e) => handleAddFollow(e)}
            >

                -Follow User-
                                               </p> */}

                <p>
                    {convertDate(item.createdAt)}
                </p>
            </div>
            <br />
            <div id='commentContent'>
                <p id={item._id}>{item.content}</p>
                <br />
            </div>

            <br />
            <div
                style={{ justifyContent: "space-between", alignContent: "flex-end" }}
                className="flex flex-row">

                <i className="far fa-heart" >
                    {item.likes}
                </i>


                <i className="fas fa-hand-holding-heart  "
                    type="comment"
                    name={item.author}
                    id={item._id}
                    // onClick={(e) => handleAddLikeComment(e)}
                    onClick={(e) => handleAddLike(e)}
                >
                </i>


                <i
                    className="far fa-comments"
                    id={item._id}
                    onClick={(e) => handleViewComments(e, e.target.id)}
                >
                    {item.commentCount}
                </i>

                {item.parentAuthor === authedUser._id
                    ?
                    (<p
                        style={{ color: "dodgerblue" }}

                        id={item._id}
                        type="comment"
                        name={item.author}  // access to the original feed author to use for notificatons....
                        onClick={(e) => handleAddView(e)}>  Reply
                        </p>
                    )
                    :
                    (
                        <i className="fab fa-rocketchat"

                            id={item._id}
                            type="comment"
                            name={item.author}  // access to the original feed author to use for notificatons....
                            onClick={(e) => handleAddView(e)}>
                        </i>
                    )
                }
            </div>

            {/* ADD COMMENT AREA */}
            <br />
            {AddView ? (

                <div className="flex center"
                >

                    <input
                        style={{ width: "700px" }}
                        id={item._id} //  Feed ID
                        parentdoc={item._id}
                        placeholder="Add comment"
                        // name={obj.author} // Access to OG author for notificaton on comments..
                        value={newComment.content || ""}
                        onChange={(e) => handleNewComment(e)}
                    >

                    </input>

                    <button style={{ height: "25px" }}

                        onClick={handleAddComment}>Add</button>

                </div>

            ) : (null)}


            {/* <div className="test"  style={{ marginBottom: "10px" }}> */}
            {/* {console.log("above comment map", item)} */}
            {(viewComments && item._id === trackId) && item.comments.map((item, i) => {
                // console.log("pre recur map", item)
                return (
                    <div id="comment-comment"
                    // style={{ marginBottom: "25px", marginTop: "25px" }}
                    >
                        <ViewProfileGalleryComments
                            authedUser={authedUser}
                            item={item}
                            key={i}
                            obj={obj}
                            i={i}
                            // handleAddFollow={handleAddFollow}
                            handleAddLike={handleAddLike}
                            handleSetPhoto={handleSetPhoto}
                        // handleGetNewFeeds={handleGetNewFeeds}
                        // getFeeds={getFeeds}
                        // handleSetFeeds={handleSetFeeds}
                        // trackFeed={trackFeed}
                        // lilNest={lilNest}
                        // nestedPath={nestedPath}
                        render={render}
                        setRender={setRender}
                        />
                    </div>
                )
            })}



            <div id="scroll"></div>
            {/* </div> */}
        </div>
    )
};

export default ViewProfileGalleryComments
