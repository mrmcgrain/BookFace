// import { useData } from "../hooks/context-hook"
// import React, { useState } from 'react'

import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { useData } from "../../../hooks/context-hook"

const ImageForm = ({ profile }) => {

    // const [update, setUpdate] = useState(false)
    // const [img, setImg] = useState({})
    const { handleUpdateProfile } = useData()

    let nav = useNavigate()

    const { id } = useParams()


    // const { authedUser } = useData()
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
            url: "http://localhost:8080/imageUpload/profile",
            data: formData,
            withCredentials: true
        })
            .then(res => {
                console.log("ers", res)
                // handleUpdateProfile(res.data.profile)

            })
            .catch(err => console.log(err))
        nav(`/profile/${id}`)
    }




    return (

        <div id='ImageForm' className="profileBody">
            {/* {console.log("update", update)} */}
            {/* {console.log("inmg", img)} */}
            {/* {console.log("ewindow", window)} */}
            <div className="flex center" style={{ marginTop: `100px` }}>

                {profile.data.profileImg ? (

                    <div id="profileImg"
                        style={{ backgroundImage: `url(${"http://localhost:8080" + profile.data.profileImg})` }}>
                    </div>
                ) : (
                        <div className="profileImg" style={{ backgroundImage: `url(${"http://localhost:8080/public/defaultImg.png"})` }}>
                        </div>)}

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit} >

                <input type="file"
                    onChange={(e) => handleSelectedFiles(e)}
                    accept="image/*"
                    type="file"
                    id="image"
                    name="image"></input>
                <button type="submit">update</button>
            </form>

            < div >


            </div >


        </div >
    )
};

export default ImageForm
