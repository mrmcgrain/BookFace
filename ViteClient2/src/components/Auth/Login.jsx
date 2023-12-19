
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useData } from "../../hooks/context-hook"
import io from 'socket.io-client'

import LoginView from "./LoginView"

import "../../css/Login.css"

// const socket = io.connect('http://localhost:8080',   {autoConnect: false})
const socket = io.connect('http://localhost:8080')

const Login = () => {

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState(null)

    const nav = useNavigate()

    const { handleSetAuthedUser, authedUser } = useData()


    useEffect(() => {

        // authedUser.username.length ? (nav(`/landing/${authedUser._id}`)) : (null)
        console.log("login USEEFFECT = authedUser.username:", authedUser.username)
        if (authedUser.username) {
            console.log("login-useEff-IF-hit")
        }


    }, [])




    const handleLogin = (e, url) => {

        e.preventDefault()
        axios({
            method: "POST",
            data: login,
            withCredentials: true,
            url: `http://localhost:8080/user/login`
        })
            .then(res => {
                if (res.data.message === "Success") {

                    console.log("login-res.user", res.data._id)

                    socket.emit("loggedIn", "loggedIn")






                    handleSetAuthedUser(res.data.user)

                    nav(`/landing/${res.data.user._id}`)
                    // nav(`/profileEdit/${res.data.user_id}`)

                } else {
                    setLogin({
                        ...login,
                        password: ""
                    })
                    setError(true)
                }
            })
            .catch(err => console.log("loginError", err))
    }



    return (
        <>
            <LoginView handleLogin={handleLogin} setLogin={setLogin} error={error} login={login}/>
        </>
    )
};

export default Login
