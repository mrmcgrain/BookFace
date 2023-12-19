// import ViewProfileActions from "./ViewProfileActions"
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react";
import { useData } from '../../../hooks/context-hook'
// import ViewProfileGalleryComments from "../ViewProfile/ViewProfileGalleryComments";
import io from 'socket.io-client'
import ViewProfileGalleryCommentsNotification from "../Notifications/ViewProfileGalleryCommentsNotification"

const socket = io.connect('http://localhost:8080')

const ViewProfileGalleryImgNotification = () => {

    const { authedUser, profile } = useData()

    let nav = useNavigate()
    let loc = useLocation()

    const { id, img } = useParams()

    const [photo, setPhoto] = useState({})

    const [addCommentView, setAddCommentView] = useState(false)
    const [viewCommentView, setViewCommentView] = useState(false)
    const [viewAddTag, setviewAddTag] = useState(false)
    const [render, setRender] = useState(false)

    const [newComment, setNewComment] = useState({
        authorId: authedUser._id,
        authorName: authedUser.username,
        content: "",
        likes: 0,
        OgImage: img,
        created: new Date(),
    })

    const [tagged, setTagged] = useState([])


    // ADD useLocation to scroll to HASH of notified link from photo comments

    useEffect(() => {

        axios({
            method: 'get',
            url: "http://localhost:8080/api/users/gallery/" + img,
            withCredentials: true,
        })
            .then(res => {
                console.log("res", res)
                setPhoto(res.data)
            })
            .catch(err => console.log("galleryErr", err))

    }, [render])



    useEffect(() => {
        console.log("useEf", loc, location.hash)

        if (location.hash) {
console.warn("hash", location.hash, location.hash.substring(1))


            setTimeout(() => {

                document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)

        }
   

    }, [location])

    const handleAddLike = (e) => {
        e.preventDefault()
        console.warn("GalleryIMg like", e.target.attributes.type)

        console.warn("IMG ADD LIKE!!")
        const payload = {
            PhotoLike: {
                path: "http://localhost:5173/users/profile/" + id + "/gallery/" + img,
                username: authedUser.username,
                userId: authedUser._id,
                ownerId: id,
                createdAt: Date.now(),
                nestLevel: 0,
                type: e.target.attributes.type.value,
                id: e.target.id
            }
        }
        axios({
            method: 'post',
            url: "http://localhost:8080/api/users/gallery/addLike/" + img,
            data: payload,
            withCredentials: true,
        })
            .then(res => {
                console.log("res", res)
                setPhoto(res.data)
            })
            .catch(err => console.log("galleryErr", err))

        socket.emit("activity", id)

    }

    const handleAddTag = (e, input) => {
        console.log("addTagged", tagged)

        let payload = {
            photoTag: {

                path: "http://localhost:5173/users/profile/" + id + "/gallery/" + img,
                username: authedUser.username,
                userId: authedUser._id,
                authorId: id,
                tagged: tagged,


            }


        }
        //  AXIOS for notifications within [tagged] user  info
        axios({
            method: "put",
            url: "http://localhost:8080/api/users/gallery/AddTag",
            data: payload
        })
            .then(res => console.log("Tagged-Res", res))
            .catch(err => console.log("err", err))
        //  filter OUT so uncheck takes off and stuff......

        socket.emit("activity", tagged)

    }


    const handleViewAddTag = () => {
        setAddCommentView(false)
        setViewCommentView(false)
        viewAddTag ? setviewAddTag(false) : setviewAddTag(true)
    }

    const handleAddCommentView = () => {
        setViewCommentView(false)
        setviewAddTag(false)
        addCommentView ? setAddCommentView(false) : setAddCommentView(true)
    }

    const handleAddComment = (e) => {
        setNewComment(prev => ({
            ...prev,
            content: e.target.value,
            id: e.target.id
        }))
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        console.log("payload", newComment)
        const payload = {

            PhotoComment: {
                path: "http://localhost:5173/users/profile/" + id + "/gallery/" + img,
                username: authedUser.username,
                userId: authedUser._id,
                ownerId: id,
                comment: newComment,
                OgImage: img,
                nestLevel: 0,
                parentdoc: img
            }
        }
        axios({
            method: "post",
            url: `http://localhost:8080/api/users/gallery/addComment/`,
            data: payload,
            // data: newComment,
            withCredentials: true,
        })
            .then(created => {
                console.warn("createed", created)
                setPhoto(created.data)
                setAddCommentView(false)
                setNewComment({})

            })
            .catch(err => console.log("err", err))

        socket.emit("activity", id)


    }

    const handleViewComments = () => {
        setAddCommentView(false)
        setviewAddTag(false)
        viewCommentView ? setViewCommentView(false) : setViewCommentView(true)

        // setTimeout(() => {
        //     scrollTo(document.getElementById('commentContent'))   
        //     console.log("should of Scrolled")
        //        }, 50);
    }

    const handleSetTagged = (input) => {
        console.log("input", input)
        if (tagged.includes(input)) {
            console.log("if tagged hit")
            // setTagged(prev => ([
            //     ...prev,
            //     prev.filter((item) => item !== input)
            // ]))
            setTagged(prev => [...prev].filter((item) => item !== input))
        } else {
            // setTagged(prev => ([
            //     ...prev,
            //     prev.concat(input)
            // ]))
            setTagged(prev => [...prev].concat(input))
        }
    }


    return (

        <div id='ViewProfileGalleryCommentsNotification'
        >
            {console.log("renderPhoto", photo)}
            {console.log("comment State", newComment)}
            {console.log("tagged", tagged)}
            {console.log("imh", img)}

<div id="imgContain">

            <div id="ViewProfileGalleryBackGroundImgNotification"
                style={{
                    backgroundImage: `url(${"http://localhost:8080" + photo.path})`,
                    height: 
                    viewCommentView ? '50%' : addCommentView ? "90%" : viewAddTag ? '80%' : '50%'
                }}
                
                // className="galleryFullImage grid-container border"
                name="gallery1"
                >
                
        
            </div>
                </div>

            <div id="GalleryActions">

                <div
                    style={{ fontSize: '24px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onClick={(e) => nav(`/users/profile/${id}/gallery`)}
                >
                    ←
                    </div>
                <div>
                    <i className="far fa-heart CommentActions" >{photo.votes}</i>
                </div>

                <div>

                    <i
                        className="fas fa-hand-holding-heart CommentActions "
                        type="feed"
                        id={photo._id}
                        onClick={(e) => handleAddLike(e)}
                    ></i>
                </div>

                <div onClick={(e) => handleViewAddTag(e)}>
                    tag
                </div>
                <div>


                    <i
                        className="far fa-comments CommentActions"
                        id={photo._id}
                        onClick={(e) => photo.comments.length ? handleViewComments(e) : null}
                    >
                        {photo && photo.comments && photo.comments.length}

                    </i>
                </div>

                <div>

                    <i className="fab fa-rocketchat CommentActions"

                        // id={photo._id}
                        type="feed"
                        // name={obj.author}  // access to the original feed author to use for notificatons....
                        // author={o}
                        onClick={(e) => handleAddCommentView(e)}> </i>

                </div>
            </div>
            {addCommentView &&
                <div className="flex center">
                    <input
                        style={{ width: "700px" }}
                        id={photo._id} //  Feed ID
                        // parentdoc={item._id}
                        placeholder="Add comment"
                        // name={obj.author} // Access to OG author for notificaton on comments..
                        value={newComment.content || ""}
                        onChange={(e) => handleAddComment(e)}
                    >
                    </input>
                    <button style={{ height: "25px" }}
                        onClick={handleSubmitComment}>Add</button>
                </div>

            }
            <br />

            <div
            // style={{borderTop: 'solid #1e90ff 1px'}}
            >

                {photo && photo.comments && photo.comments.length &&
                    photo.comments.map((item, i) => {

                        // console.log("pre OBJ", obj)

                        return (

                            <div id="VPGIMG - comment container" key={i} style={{ borderTop: 'solid #1e90ff 1px' }}>

                                <ViewProfileGalleryCommentsNotification
                                    // handleAddLike={handleAddLike}
                                    // item={item} key={i} /
                                    // handleSetPhoto={handleSetPhoto}
                                    item={item}
                                    key={i}
                                    i={i}
                                    setRender={setRender}
                                    render={render}
                                    authedUser={authedUser}
                                    // handleAddFollow={handleAddFollow}
                                    handleAddLike={handleAddLike}
                                />


                            </div>

                        )
                    })}
                <div id="TEST"></div>
            </div>
            {console.log("proiofle", profile, viewAddTag)}
            <div id="Tag" className="flex">
                {viewAddTag && profile && profile.data && profile.data.friends.map((obj) => {
                    console.log("friends", obj)

                    return (
                        <div >

                            <input
                                type="checkbox"
                                value={obj.userName}
                                id={obj.userId}
                                onChange={(e) => handleSetTagged(obj.userId)}
                            ></input>
                            <label for={obj.userId} >{obj.userName}</label>

                        </div>

                    )
                })

                }
                {viewAddTag && <button
                    onClick={(e) => handleAddTag(e)}
                    style={{ height: '25px' }}>GO</button>}
            </div>


        </div >
    )
};

export default ViewProfileGalleryImgNotification
