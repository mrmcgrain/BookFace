import AddNewFeedActions from "./AddNewFeedActions"
import React, { useState } from 'react'
import axios from 'axios'
import { useData } from "../../../hooks/context-hook"

import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')

const AddNewFeed = ({ setNewFeed, handleExpandNewFeedView }) => {

  const { authedUser } = useData()
  const [selectedFiles, setSelectedFiles] = useState([])

  const [addFeed, setAddFeed] = useState({
    author: authedUser._id,
    authorName: authedUser.username,
    feedContent: "",
    likes: 0,
    image: {}


  })

  const handleFeedChange = (e) => {
    setAddFeed(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  /////////////////////////////////////////////////////
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("submit", selectedFiles)
  //   const formData = new FormData()

  //   // if (selectedFiles) {

  //   // for (const file of selectedFiles) {
  //     formData.append('images', selectedFiles)
  //     // }
  //   // }/
  //   console.log("addFeed", addFeed)

  //   formData.append('author', addFeed.author)


  //   console.log("FORMDATA", formData)
  // }


  ////////////////////////////////////////////////////////////
  const handleFeedSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    // if (selectedFiles) {

    // for (const file of selectedFiles) {
    formData.append('images', selectedFiles)
    // }
    // }
    // console.log("addFeed", addFeed)

    formData.append('author', addFeed.author)
    formData.append('authorName', addFeed.authorName)
    formData.append('feedContent', addFeed.feedContent)
    formData.append('likes', 0)



    console.log("FORMDATA", formData)


    axios({
      method: 'POST',
      url: "http://localhost:8080/api/addfeed",
      // data: addFeed,
      data: formData,
      headers: { 'Content-Type': "multipart/form-data" }
    })
      .then(added => {
        console.log("addedFeed", added)
      })
      .catch(err => console.log("feed submit err", err))

    socket.emit("feedPost", "feedPost")

    setAddFeed(prev => ({
      ...prev,
      feedContent: ""
    }))
    // setNewFeed(true)
    handleExpandNewFeedView()
  }


  const handleSelectedFiles = (e) => {
    console.log("fiels", e.target.files)
    
    setAddFeed(prev => ({
      ...prev,
      image: e.target.files[0]
    }))
    setSelectedFiles(e.target.files[0])

  }


  return (
    <div id='AddNewFeed'>
      {console.log("add feed", addFeed)}
      {console.log("file", selectedFiles)}

      <section>

        <textarea
          onChange={(e) => handleFeedChange(e)}
          name="feedContent"
          id="feedContent"
          value={addFeed.feedContent || ""}
          placeholder="Whats on your mind?"
          style={{ height: "228px", width: "335px" }}>


        </textarea>

      </section>

      < AddNewFeedActions
        handleFeedSubmit={handleFeedSubmit}
        handleSelectedFiles={handleSelectedFiles}
      // handleSubmit={handleFeedSubmit}
      />

    </div>
  )
};

export default AddNewFeed
