import { Link, useParams } from "react-router-dom"
import { useData } from "../../../hooks/context-hook"
import axios from 'axios'
import ViewProfileActions from "./ViewProfileActions"
// import React, {useEffect}

const ViewProfileFooter = ({ handleRenderSection, renderSection, viewProfile }) => {

    const { id } = useParams()

    const { authedUser, profile } = useData()

    const handleAddFriend = (e) => {
        e.preventDefault()

        axios({
            method: "POST",
            url: "http://localhost:8080/api/users/addFriend",
            withCredentials: true,
            data: {
                userId: id,

            }
        })
            .then(res => console.log("Friend Added " + id, "res", res))
            .catch(err => console.log("Error adding friend", err))

        // socket.emit("addFriend", "addFriend")

        // ATTEMPT to only render pages of users affected.... above pay grade
        // socket.emit("addFriend", [authedUser._id, id])

    }


    const handleAddFollow = (e) => {
        console.log("add follow id", e.target.id)

        axios({
            method: "PUT",
            url: "http://localhost:8080/api/addFollow",
            withCredentials: true,
            data: { user: e.target.id }
        })
            .then(res => {
                console.log("res", res)
            })

    }



    return (
        <div id='ProfileFooter'>
            {console.log("params id: ", id, "authed", authedUser._id, viewProfile)}
         <ViewProfileActions renderSection={renderSection} handleAddFollow={handleAddFollow} handleAddFriend={handleAddFriend} handleRenderSection={handleRenderSection} profile={profile} viewProfile={viewProfile}/>

        </div>
    )
};

export default ViewProfileFooter
