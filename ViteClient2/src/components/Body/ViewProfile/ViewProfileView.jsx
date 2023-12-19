import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ViewProfileInfo from './ViewProfileInfo';
import ViewProfileFooter from './ViewProfileFooter';
import ViewProfileGallery from './ViewProfileGallery';
import ViewProfileActivity from './ViewProfileActivity';

import Messages from "../SocialConnection/_Messages"

import { useData } from "../../../hooks/context-hook"
import axios from 'axios';

const ViewProfileView = () => {

    const { id } = useParams()
    const { viewProfile, handleViewProfile } = useData()
    // const [viewProfile, setViewProfile] = useState({})

    useEffect(() => {

        axios({
            method: "GET",
            url: "http://localhost:8080/users/profile/" + id,
            withCredentials: true
        })
            .then(found => {
                console.log("viewPr", found)
                handleViewProfile(found.data)
            })
            .catch(err => console.log("err", err))



    }, [])




    const [renderSection, setRenderSection] = useState("info")

    const handleRenderSection = (input) => {
        setRenderSection(input)
    }

    // const handleViewProfile = (input) => {
    //     console.warn("input", input)
    //     handleViewProfile(input)
    // }

    return (
        <div id='ProfileView'>

            {/* {console.warn("id", id, viewProfile)} */}
            <div id="profileBody">


                {renderSection === "info" && <ViewProfileInfo />}


                {renderSection === "photo" && <ViewProfileGallery gallery={viewProfile.gallery} />}

                {renderSection === "activity" && <ViewProfileActivity />}

                {/* {renderSection === "chat" && <Messages /> }

            </div>

            {/* <ViewProfileFooter viewProfile={viewProfile} handleRenderSection={handleRenderSection} renderSection={renderSection} /> */}
            </div>
        </div>
    )
};

export default ViewProfileView
