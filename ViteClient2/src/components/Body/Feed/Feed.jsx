import AddFeed from "./_AddFeed"

import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useData } from "../../../hooks/context-hook"
import Comments from "./Comments"
import convertDate from "../../../util/convertDate"

import io from 'socket.io-client'
import FeedActions from "./FeedActions"
import AddNewFeed from "./AddNewFeed"
import ViewFeeds from "./ViewFeeds"

const socket = io.connect('http://localhost:8080')

const Feed = () => {

    const { authedUser, nestedPath } = useData()

    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [feeds, setFeeds] = useState([])
    const [newFeed, setNewFeed] = useState(false)

    /// to view comments.. .conditionaly render div
    const [viewComments, setViewComments] = useState(false)
    const [addFeedComment, setAddFeedComment] = useState(false)

    const [newComment, setNewComment] = useState({
        newComment: ""
    })

    const [trackId, setTrackId] = useState("")

    const [trackFeed, setTrackFeed] = useState("getFeeds")

    const [isLoading, setIsLoading] = useState(false)


    const { feed } = useParams()
    let location = useLocation();

    const feedFinder = useCallback(() => findFeed(), [location])

    const [feedSearch, setFeedSearch] = useState()

    const handleFeedSearch = () => {

        if (feedSearch) {

            axios({
                method: 'get',
                url: 'http://localhost:8080/api/feed/search/' + feedSearch,
                withCredentials: true
            })
                .then(res => {
                    console.log("feed search", res)
                    setFeeds(res.data)
                })
                .catch(err => console.log("feed search err", err))

        }
    }


    useEffect(() => {

        if (feeds.length) feedFinder()

    }, [feeds])


    useEffect(() => {

        // setLoading(true)

        axios({
            method: "GET",
            url: "http://localhost:8080/api/getFeeds"
        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                // document.getElementById(location.hash).scrollIntoView({ behavior: 'smooth', block: 'start' })

            })
            .finally(poop => {

                // console.warn("USEEFFECT", location)

                // findFeed()


                // console.warn("Anchor Point", location.hash.substring(1))

                // let go = document.getElementById(location.hash);    
                // document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
                feedFinder()
            })
            .catch(err => console.log("useEffect error", err))
        // hlkhlkjh

        socket.on("feedUpdated", data => {
            // console.log("socket useeffect feed hit")

            axios({
                method: "GET",
                url: "http://localhost:8080/api/getFeeds"
            })
                .then(got => {
                    // console.log("got feeds", got.data)
                    handleSetFeeds(got.data)
                    // setFeeds(prev => ({ ...prev, got }))
                })
                .then(() => setLoading(false))
                .catch(setError)
        })

    }, [socket, location.hash])




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


        if (location.hash) {
            console.warn("location.hash - SCROLL")
            document.getElementById(location.hash.substring(1)).scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else return

        setTrackId(location.hash.substring(1))
        // viewComments ? setViewComments(false) : setViewComments(true)
        setViewComments(true)
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
            // process.exit(-1)

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



    const handleGetNewFeeds = () => {

        // setLoading(true)

        axios({
            method: "GET",
            url: "http://localhost:8080/api/getFeeds"
        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                // console.log("LOADED!!!!")
            })
            .then(() => setLoading(false))
            .catch(setError)
    }


    const handleFollowingFeeds = () => {

        // setLoading(true)


        axios({
            method: "GET",
            url: "http://localhost:8080/api/getFollowingFeeds",
            withCredentials: true,

        })
            .then(got => {
                // setIsLoading(true)
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))
                // setIsLoading(false)
            })
            // .then(() => setLoading(false))
            .catch(setError)
    }


    const handleMyFeeds = (e) => {

        // setLoading(true)

        axios({
            method: "GET",
            url: "http://localhost:8080/api/getMyFeeds",
            withCredentials: true,

        })
            .then(got => {
                // console.log("got feeds", got.data)
                handleSetFeeds(got.data)
                // setFeeds(prev => ({ ...prev, got }))

            })
            // .then(() => setLoading(false))
            .catch(setError)
    }


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
        console.log("handleViewNewComments", e.target)
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
                console.warn("added", added)
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
                socket.emit("activity", added.data.author)
            })
            .catch(err => console.log(err))

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
        console.warn("e.target.name", e.target.attributes.name)
        // let id = e.target.id
        let payload = {
            id: e.target.id,
            type: e.target.attributes.type.value,
            ogUser: e.target.attributes.name.value,
            ogFeed: e.target.id

        }
        console.log("like payload", payload, "e.target.name", e.target.name)
        // 
        axios({
            method: "POST",
            url: "http://localhost:8080/api/addLike",
            data: payload,
            withCredentials: true
        })
            .then(added => {
                // console.log("WTF", feeds.find(id) )
                // setFeeds(prev => prev.map((item) => item._id === added.data._id ? added.data : item))
            })
            .catch(err => console.log("err", err))
        // handleAllFeeds(trackFeed)
        // socket.emit("activity", "Like")
        socket.emit("activity", e.target.attributes.name.value)

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

    const [expandNewFeed, setExpandNewFeed] = useState(false)

    const handleExpandNewFeedView = () => {
        console.log("handleExpandNewFeedView")
        expandNewFeed ? setExpandNewFeed(false) :
            setExpandNewFeed(true)
    }


    if (loading) return <h1>...Loading</h1>
    if (error) return <pre> {JSON.stringify(error, null, 2)} </pre>

    return (
        <div id='Feed'>

            <div className="flex flex-row" style={{ justifyContent: "space-evenly" }}>

                <p
                    className="bubble"
                    onClick={(e) => handleAllFeeds(e, "getFeeds")}>New
                    </p>
                <p>|</p>
                <p
                    className="bubble"
                    onClick={(e) => handleAllFeeds(e, "getFeeds")}>Trending
                    </p>
                <p>|</p>
                <p
                    className="bubble"
                    onClick={(e) => handleAllFeeds(e, "getFollowingFeeds")}>Followings </p>

                <p>|</p>

                <p
                    className="bubble"
                    onClick={(e) => handleAllFeeds(e, "getMyFeeds")}>My </p>
            </div>

            <div id="" className="flex center">


                {/* expand search etc */}
                <FeedActions
                    handleFeedSearch={handleFeedSearch}
                    setFeedSearch={setFeedSearch}
                    feedSearch={feedSearch}
                    handleExpandNewFeedView={handleExpandNewFeedView}
                />


            </div>

            {expandNewFeed ? (<AddNewFeed handleExpandNewFeedView={handleExpandNewFeedView} />) : (<div id="ViewFeedContainer">

                <ViewFeeds
                    handleSetFeeds={handleSetFeeds}
                    trackId={trackId}
                    handleViewFeedComments={handleViewFeedComments}
                    feeds={feeds}
                    handleAddFeedComment={handleAddFeedComment}
                    handleAddFollow={handleAddFollow}
                    handleAddLike={handleAddLike}
                    handleAddFeedComment={handleAddFeedComment}
                    addFeedComment={addFeedComment}
                    viewComments={viewComments}
                    newComment={newComment}
                    handleNewCommentSubmit={handleNewCommentSubmit}
                    handleNewComment={handleNewComment}
                />
            </div>)}





        </div>
    )
};

export default Feed

