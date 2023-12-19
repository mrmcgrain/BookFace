import { Link, useParams, useNavigate } from "react-router-dom"
import { useData } from "../../hooks/context-hook"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Feed from "./Feed/Feed"

import io from 'socket.io-client'


const socket = io.connect('http://localhost:8080')

const Landing = () => {

    const nav = useNavigate()
    const { id } = useParams()

    const { authedUser, messages, profile, handleSetMessages, handleUpdateProfile } = useData()


    // useEffect(() => {
        // console.log("objvalues", Object.values(profile.data).length)
        // if (Object.values(profile.data).length < 28) {

        //     nav(`/profileEdit/${authedUser._id}`)
        // }
    // }, [])



    useEffect(() => {
        // socket.emit('join_room', authedUser._id)

        // axios({
        //     method: 'get',
        //     withCredentials: true,
        //     url: "http://localhost:8080/profile"
        // })
        //     .then(res => {
        //         // console.log("res", res)
        //         // setProfile(res)
        //         handleUpdateProfile(res)
        //     }
        //     )
        //     .catch(err => console.log("err", err))

        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8080/api/getAllMessages"
        })
            // .then(res => setMsg(res))
            .then(res => Object.keys(res.data).length ? handleSetMessages(res) : handleSetMessages())
            // .then(() => setIsLoading(false))
            .catch(err => console.log("err", err))

    }, [])

    return (

        <div id='Landing' className="border flex-col">

 <Feed />





        </div>
    )
};

export default Landing
