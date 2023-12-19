import { useData } from "../../../hooks/context-hook"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import axios from 'axios'
import ProfileEditFooter from "./ProfileEditFooter"
import ProfileEditView from "./ProfileEditView";
import EditUserInfo from "./EditUserInfo";
import ImageForm from "./ImageForm";
import UploadGallery from "../Profile/UploadGallery";

const ProfileEdit = () => {

    let nav = useNavigate()

    const { handleUpdateProfile, profile, handleSetMessages, messages, authedUser } = useData()

    const [renderSection, setRenderSection] = useState("profile")

    const [updateProfile, setUpdateProfile] = useState({
        // city: "",
        // state: "",
        // zipcode: ""
    })

    const handleRenderSection = (input) => {

        setRenderSection(input)
    }

    const handleSubmitProfile = (e) => {
        e.preventDefault()

        axios({
            method: 'POST',
            withCredentials: true,
            url: `http://localhost:8080/api/updateProfile`,
            data: updateProfile
        })
            .then(res => {
                console.log("handleSubmitProfile-RES", res)
                // setProfile(res)
                handleUpdateProfile(res)
                nav(`/profile/${authedUser._id}`)

            }
            )
            .catch(err => console.log("err", err))

    }

    return (
        <div id='ProfileEdit'>

            {renderSection === "profile" &&
                <ProfileEditView profile={profile} setUpdateProfile={setUpdateProfile} handleSubmitProfile={handleSubmitProfile} />
            }
            {renderSection === "userInfo" &&
                <EditUserInfo />
            }
            {renderSection === "profileImg" &&
                <ImageForm profile={profile} />
            }
            {renderSection === "gallery" &&
                <UploadGallery gallery={profile.data.gallery} />
            }

            <ProfileEditFooter handleRenderSection={handleRenderSection} />


        </div>



    )
};

export default ProfileEdit
