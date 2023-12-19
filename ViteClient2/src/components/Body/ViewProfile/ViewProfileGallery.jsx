// import { Suspense } from "react"
import React, { useState, useEffect } from 'react'
// import ViewProfileGalleryImg from "./ViewProfileGalleryImg"
import { useData } from "../../../hooks/context-hook"
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'


const ViewProfileGallery = ({ gallery }) => {

    const { id } = useParams()

    const [gotGallery, setGotGallery] = useState([])

    useEffect(() => {
console.log("params ID", id)
        //  get gallery incase of nested routing... ie... follow link or paste link

        axios({
            method: "get",
            url: 'http://localhost:8080/api/users/getgallery/' + id,
            withCredentials: true,
        })
            .then(gotGallery => {
                console.log("got gallery", gotGallery)
                setGotGallery(gotGallery.data)
            })
            .catch(err => console.log("get gallery err", err))

    }, [])



    const { viewProfile, authedUser } = useData()
    const [renderPhoto, setRenderPhoto] = useState({})


    const handleRenderPhoto = (e, input) => {
        console.log("hadnleRenderPhoto", e.target.id)
        setRenderPhoto(input)

    }


    return (
        <div id='ProfileGallery' className="profileBody">
            {console.log("gallery", gallery, viewProfile, authedUser)}
            {console.log("authed = params", authedUser._id === id)}
            {console.log("got Gallery", gotGallery)}
            {/* {Object.keys(renderPhoto).length
                    ?

                    (
                        <ViewProfileGalleryImg renderPhoto={renderPhoto} gallery={gallery} />
                    )
                    :
                    (  */}
            <div className="grid-container">
                {/* {viewProfile && viewProfile.gallery && viewProfile.gallery.map((img, i) => { */}
                {gotGallery.map((img, i) => {
                    // console.log("imh", img)
                    return (
                        <section key={i}>
                            <Link to={`/users/profile/${id}/gallery/${img._id}`}>

                                <div
                                    // onClick={(e) => handleRenderPhoto(e, img)}
                                    style={{ backgroundImage: `url(${"http://localhost:8080" + img.path})` }}
                                    className="galleryImg grid-container border"
                                    name="gallery1"
                                    id={img._id}

                                >

                                    {/* <div> */}
                                    likes: {img.votes}  -  comments :{img.comments.length}
                                    {/* </div> */}

                                </div>

                            </Link>
                            <div>
                            </div>

                        </section>

                    )
                })}


            </div>

            {/* )
                } */}


            {/* </section> */}
        </div >
    )
};

export default ViewProfileGallery
