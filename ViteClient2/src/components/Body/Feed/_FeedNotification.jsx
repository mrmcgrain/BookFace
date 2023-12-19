// import AddFeed from "./AddFeed"

import axios from 'axios'
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useData } from "../../../hooks/context-hook"
import CommentsNotification from "./CommentsNotification"
import convertDate from "../../../util/convertDate"
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')

const FeedNotification = ({ propFeed }) => {

    const { authedUser, nestedPath } = useData()

    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [feeds, setFeeds] = useState([])
    const [newFeed, setNewFeed] = useState(false)

    /// to view comments.. .conditionaly render div
    const [viewComments, setViewComments] = useState(true)
    const [addFeedComment, setAddFeedComment] = useState(false)

    const [newComment, setNewComment] = useState({
        newComment: ""
    })

    const [trackId, setTrackId] = useState("")

    const [trackFeed, setTrackFeed] = useState("getFeeds")

    const [isLoading, setIsLoading] = useState(false)


    const { feed } = useParams()
    const { id } = useParams()
    let location = useLocation();

    const feedFinder = useCallback(() => findFeed(), [location])


    // const [deepFind, setDeepFind] = useState()

    // let lilNest = nestedPath.slice(1)
    ///// if param of anchor tag..... navigate to og feed of comments.... then figure out how to expand..

    // useEffect(() => {


    //     console.warn("USEEFFECT", location.hash)
    //     // let go = document.getElementById(location.hash);
    //     // document.getElementById(location.hash).scrollIntoView({ behavior: 'smooth', block: 'start' })

    // }, [location.hash])


    useEffect(() => {

        axios({
            method: "GET",
            url: `http://localhost:8080/api/notification/feed/${id}`
        })
            .then(res => {
                console.log("res", res)
                // setComment(res.data[0])handleNestedPath
                // handleNestedPath(res.data[0].nestedPath)
                // setFeeds(res)
                handleSetFeeds(res.data)

            })
            .finally(die => {
                // console.log("loc", location.hash)
                // document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
                // console.log("DIE")
            })
            .catch(err => console.log("err", err))
    }, [feed])


    useEffect(() => {
        if (feeds.length) {

            let go = document.getElementById(location.hash.substring(1))
            go.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

    }, [feeds])



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
                setFeeds(res)
                //     let go = document.getElementById(location.hash);    
                //    document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
            // .then(()=>{
            // })
            .catch(err => console.log("err", err))
        // expandComments(input)




    }

    // useEffect(() => {

    //     // setLoading(true)

    //     axios({
    //         method: "GET",
    //         url: "http://localhost:8080/api/getFeeds"
    //     })
    //         .then(got => {
    //             // console.log("got feeds", got.data)
    //             handleSetFeeds(got.data)
    //             // setFeeds(prev => ({ ...prev, got }))
    //             // document.getElementById(location.hash).scrollIntoView({ behavior: 'smooth', block: 'start' })

    //         })
    //         .finally(poop => {

    //             // console.warn("USEEFFECT", location)

    //             // findFeed()


    //             // console.warn("Anchor Point", location.hash.substring(1))

    //             // let go = document.getElementById(location.hash);    
    //             // document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
    //             feedFinder()
    //         })
    //         .catch(err => console.log("useEffect error", err))
    //     // hlkhlkjh

    //     socket.on("feedUpdated", data => {
    //         // console.log("socket useeffect feed hit")

    //         axios({
    //             method: "GET",
    //             url: "http://localhost:8080/api/getFeeds"
    //         })
    //             .then(got => {
    //                 // console.log("got feeds", got.data)
    //                 handleSetFeeds(got.data)
    //                 // setFeeds(prev => ({ ...prev, got }))
    //             })
    //             .then(() => setLoading(false))
    //             .catch(setError)
    //     })

    // }, [socket, location.hash])




    const findFeed = () => {
        // console.warn("USEEFFECT", location)

        // axios({
        //     method: "GET", 
        //     url: "http://localhost:8080/api/deepFind/" + location.hash.substring(1)
        // })
        // .then(found => {
        //     console.log("found", found)
        //     setDeepFind(found)
        // })

        // console.warn("Anchor Point", location.hash.substring(1))
        // let go = document.getElementById(location.hash);

        /// we have the og feed..... so in nestedPath....pull all id's, expand windows accordingly start to finish
        // console.warn("Feed TEST nest", feeds.find((item) => item._id === location.hash.substring(1)))


        // recursivly poplute nested path now that we found it....... NEED to start search at nested commment

        // if (feeds.length) recure(feeds, '65036150ce1c6b41546707e2')


        // if (location.hash) {

        //     document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
        // } else return

        // setTrackId(location.hash.substring(1))
        // viewComments ? setViewComments(false) : setViewComments(true)

    }

    const [expandFeed, setExpandFeed] = useState([])



    let count = 0
    let flag

    const deepSearch = (obj, ID) => {
        count += 1
        console.log("DS obj", obj, ID, "count = ", count)

        // if (expandFeed.length) {
        //     // return

        // } else
        if (obj._id == ID) {
            console.warn("FOUND", obj, count)
            setExpandFeed(obj.nestedPath)
            // process.exit()

            // return obj
            // obj.nestedPath.forEach((item) => {
            //     console.log("expanding", item)
            setTrackId(obj.OgFeed)
            viewComments ? setViewComments(false) : setViewComments(true)
            // })

        } else if (obj.comments.length) {
            console.log("DS else IF", obj)
            obj.comments.forEach((obj) => {
                deepSearch(obj, ID)
            })
        } else {
            return console.log("No match")
        }
    }

    if (expandFeed.length) {
        console.log("expandedfeed.len HIT", expandFeed)
        // setTrackId(expandFeed[0])
        // viewComments ? setViewComments(false) : setViewComments(true)
        return


        // const expand = (arr) => {

        // expandFeed.forEach((item) => {
        // })
        // }

    }


    const handleAddFollow = (e) => {
        console.log("add follow id", e.target.id)

        // setLoading(true)

        axios({
            method: "PUT",
            url: "http://localhost:8080/api/addFollow",
            withCredentials: true,
            data: { user: e.target.id }
        })
            .then(res => {
                console.log("res", res)
            })
            // .then(() => setLoading(false))
            .catch(setError)

    }


    const handleAllFeeds = (e, input) => {
        console.log("handleAllFeeds - input", input)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/${input}`,
            withCredentials: true
        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                // console.log("LOADED!!!!")
            })
            .then(() => setLoading(false))
            .catch(setError)

        setTrackFeed(input)
    }



    // const handleGetNewFeeds = () => {

    //     // setLoading(true)

    //     axios({
    //         method: "GET",
    //         url: "http://localhost:8080/api/getFeeds"
    //     })
    //         .then(got => {
    //             // console.log("got feeds", got.data)
    //             handleSetFeeds(got.data)
    //             // setFeeds(prev => ({ ...prev, got }))
    //             // console.log("LOADED!!!!")
    //         })
    //         .then(() => setLoading(false))
    //         .catch(setError)
    // }


    // const handleFollowingFeeds = () => {

    //     // setLoading(true)


    //     axios({
    //         method: "GET",
    //         url: "http://localhost:8080/api/getFollowingFeeds",
    //         withCredentials: true,

    //     })
    //         .then(got => {
    //             // setIsLoading(true)
    //             // console.log("got feeds", got.data)
    //             handleSetFeeds(got.data)
    //             // setFeeds(prev => ({ ...prev, got }))
    //             // setIsLoading(false)
    //         })
    //         // .then(() => setLoading(false))
    //         .catch(setError)
    // }


    // const handleMyFeeds = (e) => {

    //     // setLoading(true)

    //     axios({
    //         method: "GET",
    //         url: "http://localhost:8080/api/getMyFeeds",
    //         withCredentials: true,

    //     })
    //         .then(got => {
    //             // console.log("got feeds", got.data)
    //             handleSetFeeds(got.data)
    //             // setFeeds(prev => ({ ...prev, got }))

    //         })
    //         // .then(() => setLoading(false))
    //         .catch(setError)
    // }


    const handleSetFeeds = (input = {}) => {
        // console.log("hadnlesetFeeds input", input)
        setFeeds(input)
    }

    const handleViewFeedComments = (e) => {
        // console.log("view comments", e.target.id)

        setTrackId(e.target.id)
        viewComments ? setViewComments(false) : setViewComments(true)
    }

    const handleAddFeedComment = (e) => {
        // console.log("handleViewNewComments", e.target)
        setTrackId(e.target.id)
        addFeedComment ? setAddFeedComment(false) : setAddFeedComment(true)
    }

    const handleNewComment = (e) => {
        // console.log("addComment event", e.target.attributes.name)
        // console.log("addcomment event author", e.target.name)
        setNewComment(prev => ({
            ...prev,
            content: e.target.value,
            OgFeed: e.target.id, // OG Feed ID
            parentDoc: e.target.id,
            authorId: authedUser._id,
            authorName: authedUser.username,
            created: new Date(),
            ogAuthor: e.target.name,
            likes: 0,
            type: e.target.attributes.name,
            parentAuthor: e.target.name,
            nestLevel: 1

            // OgComment:  Hoiw to determine difference from feeed and comment
        }))
    }


    // authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    // authorName: String,
    // content: String,
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    // likes: Number,
    // likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // OgFeed: { type: Schema.Types.ObjectId, ref: 'Feed' },
    // OgComment: { type: Schema.Types.ObjectId, ref: 'Comments' },
    // commentCount: Number






    const handleNewCommentSubmit = () => {
        // console.log("sending payload", newComment)
        axios({
            method: "POST",
            url: "http://localhost:8080/api/addComment",
            data: newComment
        })
            .then(added => {
                // console.log("added", added)
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
            })
            .catch(err => console.log(err))
        socket.emit("activity", "Comment")

        ////   EXTRA axios to rerend initial feed to show comment count and vote count LIVE

        axios({
            method: "GET",
            url: `http://localhost:8080/api/${trackFeed}`,
            withCredentials: true
        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                // console.log("LOADED!!!!")
            })
            // .then(() => setLoading(false))
            .catch(err => console.log("err", err))





        setAddFeedComment(false)
        setNewComment({})
        // handleViewNewComment()
    }

    const handleAddLike = (e) => {
        e.preventDefault()
        // console.log("add like", e.target.id, e.target.attributes.name)
        // console.log("like target", e.target)
        // console.log("WTF", feeds.find(id) )

        // let id = e.target.id
        let payload = { id: e.target.id, type: e.target.attributes.name.value }
        // console.log("like payload", payload)
        // 
        axios({
            method: "POST",
            url: "http://localhost:8080/api/addLike",
            data: payload,
            withCredentials: true
        })
            .then(added => {
                // console.log("WTF", feeds.find(id) )
                console.log("added like", added)
                setFeeds(added.data)
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
            })
            .catch(err => console.log("err", err))
        // handleAllFeeds(trackFeed)
        socket.emit("activity", "Like")

        axios({
            method: "GET",
            url: `http://localhost:8080/api/${trackFeed}`,
            withCredentials: true
        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                console.log("LOADED!!!!")
            })
            // .then(() => setLoading(false))
            .finally(() => setLoading(false))
            .catch(setError)
    }


    if (loading) return <h1>...Loading</h1>
    if (error) return <pre> {JSON.stringify(error, null, 2)} </pre>

    return (
        <div id='FeedNotification'>
            {/* {console.log("feeds", feeds)} */}
            {/* {console.log("RECURE TEST", recure(feeds[0], "64f8df420d9a8b22ecdbbc20"))} */}
            {/* {console.log("...", feeds[0].comments)} */}
            {/* {console.log("trackedID", trackId)} */}
            {/* {console.log("loading status", loading)} */}
            {/* {console.log("newFeed", newFeed)} */}
            {/* {console.log("Feed Render")} */}
            {/* {console.log("trackedFeed", trackFeed)} */}
            {/* {console.log("loc", location.hash)} */}
            {/* {console.log("Stringify", JSON.stringify(feeds, null, 2))} */}
            {/* {console.log("expandFeed", expandFeed)} */}
            {/* {console.log("nestedPath-CONTEXT", nestedPath)} */}
            {/* {console.log("Lil Nest-", lilNest)} */}
            {console.log("propFeed", propFeed)}
            {console.log("feeds", feeds)}
            {console.log("id", id)}

            {/* <p onClick={(e) => feeds.forEach((obj) => deepSearch(obj, "6503614bce1c6b41546707c6"))}>RECURE</p> */}
            <br />
            <div className="flex flex-row" style={{ justifyContent: "space-evenly" }}>

                {/* <p onClick={handleGetNewFeeds}>New Feeds</p> */}
                {/* <p onClick={(e) => handleAllFeeds(e, "getFeeds")}>New Feeds</p> */}

                {/*  USE FEED BUTTON ON CLICK to dynamicaly change axios hit for feed response */}
                {/* ALSO ADD scrollless smooth to feeds just like chat messags */}

                {/* <p onClick={(e) => handleFollowingFeeds(e)}>Followings Feeds</p> */}
                {/* <p onClick={(e) => handleAllFeeds(e, "getFollowingFeeds")}>Followings Feeds</p> */}



                {/* <p onClick={handleMyFeeds}>My Feeds</p> */}
                {/* <p onClick={(e) => handleAllFeeds(e, "getMyFeeds")}>My Feeds</p> */}



            </div>

            <div className="flex center">


                {/* <AddFeed setNewFeed={setNewFeed} /> */}


            </div>

            <div id="viewFeed" className="flex  flex-col ">


                {isLoading
                    ?
                    (
                        <p>please wait as we find</p>
                    )
                    :
                    (
                        null
                    )}


                {feeds.length
                    ?
                    (

                        // propFeed.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map((obj, i) => {
                        feeds.map((obj, i) => {

                            return (

                                <div
                                    key={i}
                                    id={obj._id}
                                    className="border feed"
                                >
                                    <div className="flex"
                                        style={{ justifyContent: "space-between" }}
                                    >
                                        {/* <p>
                                            {`posted by : `}
                                        </p> */}
                                        <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + obj.author}> {obj.authorName} </Link>



                                        <i className="fas fa-people-arrows"
                                            id={obj.author}
                                            onClick={(e) => handleAddFollow(e)}
                                        >

                                        </i>

                                        {/* <p
                                            id={obj.author}
                                            onClick={(e) => handleAddFollow(e)}
                                        >

                                            -Follow User-
                                    </p>

 */}



                                        <p>
                                            {convertDate(obj.createdAt)}
                                        </p>
                                    </div>

                                    <div id="feedContent2">
                                        <p>{obj.feedContent}</p>
                                        <br />
                                    </div>

                                    {/* /////////////////////// */}


                                    <div
                                        style={{ justifyContent: "space-between", alignContent: "flex-end", paddingBottom: " 8px" }}
                                        className="flex flex-row">

                                        <i className="far fa-heart  " >{obj.likes}</i>

                                        {/* <p>likes : {obj.likes}</p> */}
                                        {/* 


<i className=" 	fas fa-user-plus" >

</i> */}

                                        <i className="fas fa-hand-holding-heart  "
                                            name="feed"
                                            type="feed"
                                            id={obj._id}
                                            onClick={(e) => handleAddLike(e)}

                                        ></i>

                                        {/* <p
                                            name="feed"
                                            type="feed"
                                            id={obj._id}
                                            onClick={(e) => handleAddLike(e)}
                                        // onClick={(e)=>console.log(e.target)}
                                        >like
                                            </p> */}

                                        <i
                                            className="far fa-comments"
                                            id={obj._id}
                                            onClick={(e) => handleViewFeedComments(e)}> {obj.commentCount}

                                        </i>
                                        {/* <p
                                            id={obj._id}
                                            onClick={(e) => handleViewFeedComments(e)}> View Comments {obj.commentCount}
                                        </p> */}


                                        <i className="fab fa-rocketchat"

                                            id={obj._id}
                                            type="feed"
                                            name={obj.author}  // access to the original feed author to use for notificatons....
                                            // author={o}
                                            onClick={(e) => handleAddFeedComment(e)}> </i>

                                        {/* 

                                        <p
                                            id={obj._id}
                                            type="feed"
                                            name={obj.author}  // access to the original feed author to use for notificatons....
                                            // author={o}
                                            onClick={(e) => handleAddFeedComment(e)}>  Add Comment
                                            </p> */}
                                    </div>




                                    {(addFeedComment && obj._id === trackId) &&
                                        <div className="flex center"
                                        >
                                            {console.log("obj add comment", obj)}


                                            <input
                                                style={{ width: "700px" }}
                                                id={obj._id} //  Feed ID
                                                placeholder="Add comment"
                                                name={obj.author} // Access to OG author for notificaton on comments..
                                                value={newComment.content || ""}
                                                onChange={(e) => handleNewComment(e)}
                                            >

                                            </input>

                                            <button

                                                onClick={handleNewCommentSubmit}>Add</button>

                                        </div>
                                    }



                                    {/* Call comment comp here */}
                                    {/* {(viewComments && obj._id === trackId) && feeds[0].comments.map((item, i) => { */}
                                    {feeds[0].comments.map((item, i) => {
                                        return (

                                            <CommentsNotification
                                                // <Feed
                                                expandFeed={expandFeed}
                                                authedUser={authedUser}
                                                item={item}
                                                key={i}
                                                obj={obj}
                                                i={i}
                                                handleAddFollow={handleAddFollow}
                                                handleAddLike={handleAddLike}
                                                trackFeed={trackFeed}
                                                handleSetFeeds={handleSetFeeds}
                                            // lilNest={lilNest}
                                            />
                                        )
                                    }
                                    )}



                                </div>
                            )
                        })

                    )






                    :
                    (
                        <p> .... loading</p>
                    )}





                <br />
            </div>




        </div>
    )
};

export default FeedNotification

