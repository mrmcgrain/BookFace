// // import { Suspense } from "react"

// const ProfileGallery = ({ gallery }) => {

//     // const renderPhoto = () => {

//     //     gallery.map((img) => {
//     //         return (

//     //             <div style={{ width: "150px", height: "150px", backgroundImage: `url(${"http://localhost:8080" + img})` }} className=" gallery border" name="gallery1"> </div>
//     //         )
//     //     })

//     // }

//     return (
//         <div id='ProfileGallery'>
//             {console.log("gallery", gallery)}
//             <section id="Profilegallery">

//                 <div className="grid-container">
//                     {gallery.map((img, i) => {
//                         return (

//                             <div key={i} style={{ backgroundImage: `url(${"http://localhost:8080" + img.path})` }} className=" galleryImg grid-container border" name="gallery1">
//                             </div>

//                         )
//                     })}


//                 </div>



//             </section>
//         </div>
//     )
// };

// export default ProfileGallery

// import { Suspense } from "react"
import React, { useState } from 'react'
// import ViewProfileGalleryImg from "./ViewProfileGalleryImg"
import { useData } from "../../../hooks/context-hook"

import { useParams, Link } from 'react-router-dom'


const ProfileGallery = ({ gallery }) => {


    const { id } = useParams()

    const { Profile } = useData()
    const [renderPhoto, setRenderPhoto] = useState({})


    const handleRenderPhoto = (e, input) => {
        console.log("hadnleRenderPhoto", e.target.id)
        setRenderPhoto(input)

    }


    return (
        <>
    
        </>
    )
};

export default ProfileGallery
