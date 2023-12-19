import React, { useState, useEffect } from 'react'
import ProfileInfo from './ProfileInfo';
import ProfileFooter from './ProfileFooter';
import ProfileGallery from './ProfileGallery';
import ProfileActivity from './ProfileActivity';
import { useData } from "../../../hooks/context-hook"
import { useNavigate } from 'react-router-dom'

const ProfileView = () => {
    let nav = useNavigate()
    const { profile, authedUser } = useData()

    useEffect(() => {
        // console.log("objvalues", Object.values(profile.data).length)
      
        if (profile.data && Object.values(profile.data).length < 28) {

            nav(`/profileEdit/${authedUser._id}`)
        }
    }, [])

    const [renderSection, setRenderSection] = useState("info")

    const handleRenderSection = (input) => {
        setRenderSection(input)
    }

    return (
        <div id='ProfileView'>

            <div id='ProfileView'>

                <div id="profileBody">


                    {renderSection === "info" && <ProfileInfo profile={profile} />}

                    {renderSection === "photo" && <ProfileGallery gallery={profile.data.gallery} />}

                    {renderSection === "activity" && <ProfileActivity />}

                </div>

                <ProfileFooter handleRenderSection={handleRenderSection} renderSection={renderSection} />
            </div>

        </div>
    )
};

export default ProfileView
