import React, { useState } from 'react'
import axios from 'axios'
import { useData } from "../../../hooks/context-hook"

import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')

const AddFeed = ({ setNewFeed }) => {

    const { authedUser } = useData()

    const [addFeed, setAddFeed] = useState({
        author: authedUser._id,
        authorName: authedUser.username,
        feedContent: "",
        likes: 0


    })

    const handleFeedChange = (e) => {
        setAddFeed(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleFeedSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: "http://localhost:8080/api/addfeed",
            data: addFeed
        })
            .then(added => {
                // console.log("addedFeed", added)
            })
            .catch(err => console.log("feed submit err", err))

        socket.emit("feedPost", "feedPost")

        setAddFeed(prev => ({
            ...prev,
            feedContent: ""
        }))
        setNewFeed(true)
    }


    return (
        <div id='FeedActions' className="flex" style={{ display: "flex",  justifyContent: "space-evenly" }}>
            {/* <div id="feed" > */}
            {/* {console.log("Add Feed Render")} */}
            <div>
                <p> down arrow</p>
            </div>
            <div>

                <form>
                    <input
                        // style={{ width: "400px" }}
                        onChange={(e) => handleFeedChange(e)}
                        name="feedContent"
                        id="feedContent"
                        value={addFeed.feedContent || ""}
                        placeholder="Search feeds"></input>
                    {/* <button
                        disabled={addFeed.feedContent.length > 6 ? false : true}
                    onClick={(e) => handleFeedSubmit(e)}>Share</button> */}
                </form>
                {/* </div> */}
            </div>
            <div>

                <p> ...</p>
            </div>




        </div>
    )
};

export default AddFeed
