import { useData } from "../../../hooks/context-hook"

import React, { useState } from "react"
import axios from 'axios'
import { Link, useParams, useNavigate } from "react-router-dom"


const UploadGallery = ( { gallery }) => {
let nav = useNavigate()

const { authedUser } = useData()
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleSelectedFiles = (e) => {
        setSelectedFiles(e.target.files)

    }

    const handleSubmit = (e) => {
        console.log("submiting", selectedFiles)
        e.preventDefault()
        const formData = new FormData()
        for (const file of selectedFiles) {
            formData.append('images', file)
        }

        axios({
            method: "POST",
            url: "http://localhost:8080/imageUpload/gallery",
            data: formData,
            withCredentials: true
        })
            .then(res => console.log("ers", res))
            nav(`/profile/${authedUser._id}`)

    }





    return (
        <div id='UploadGallery' className="profileBody">
            {/* {console.log("formData", formData)} */}
            {console.log("selectedFiles", selectedFiles)}
            <p> Upload  Gallery  images</p>

            <section id="Profilegallery">

<div className="grid-container">
    {gallery.map((img) => {
        return (

            <div style={{ backgroundImage: `url(${"http://localhost:8080" + img})` }} className=" galleryImg grid-container border" name="gallery1">
            </div>

        )
    })}


</div>



</section>
            <form onSubmit={handleSubmit} >

                <input type="file" multiple onChange={(e) => handleSelectedFiles(e)}
                    name="images"></input>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
};

export default UploadGallery
