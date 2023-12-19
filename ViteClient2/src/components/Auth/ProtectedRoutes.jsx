import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useOutlet, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useData } from "../../hooks/context-hook"

// import useDataFetch from '../hooks/useDataFetch'


const ProtectedRoutes = () => {

    let loc = useLocation()
    let { id } = useParams()

    const { authedUser, handleSetAuthedUser, handleUpdateProfile, handleSetMessages, profile, handleViewProfile } = useData()
    // let auth = { 'token': false }
    const [loggedIn, setLoggedIn] = useState(false)
    // const [axTest, setAxTest] = useState()

    let nav = useNavigate()

    // console.log("useAxios", useDataFetch('GET', "/user/auth", "null", 'true'))

    // const { data } = useDataFetch('GET', "/user/auth/", "null", 'true')
    // // handleSetAuthedUser(data)
    // console.log("data", data)


    useEffect(() => {
        // async function fetchd() {

        //     let go = await useDataFetch('GET', "/user/auth", "null", 'true')
        //     console.warn("go", go)
        // }

        // fetchd()


        // axios call to get authed userInfo......
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/user/auth"
        })
            .then(res => { //
                console.warn("PROT ROUTE auth res", res)
                if (res.data.username) {
                    console.log("protectedRoute.then.axios = res.data.username", res.data.username)
                    // console.log("res.user", res.data.username)
                    handleSetAuthedUser(res.data)
                    // console.log("log", loggedIn)
                    setLoggedIn(true)
                }

                // }).then(() => {
                //     setLoggedIn(true)

            })
            .catch(err => {
                console.log("useAuth err", err);
            })

    }, [])

    // async function bob () {
    //    let go = await useDataFetch('GET', "/user/auth", "null", 'true')
    // }


    useEffect(() => {


        console.log("Protected Routes reseting profile state")


        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8080/profile"
        })
            .then(res => {
                console.log("CONTEXT PROFILE res", res)
                // setProfile(res)
                handleUpdateProfile(res)
            })
            .catch(err => console.log("CONTXT PROFIULE err", err))
    }, [])

    useEffect(() => {

        if (loc.pathname.includes("/users/profile")) {
            console.warn("Getting ViewProfile Info")
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


        }

    }, [])

    //     useEffect(() => {
    // console.log("Protected Routes - getallmsgs")
    //         axios({
    //             method: 'get',
    //             withCredentials: true,
    //             url: "http://localhost:8080/api/getAllMessages"
    //         })
    //             // .then(res => setMsg(res))
    //             .then(res => Object.keys(res.data).length ? handleSetMessages(res) : handleSetMessages())
    //             // .then(() => setIsLoading(false))
    //             .catch(err => console.log("err", err))

    //     }, [])


    return (
        <>
            {console.log("ProtectedRoute HIT", authedUser, loggedIn, loc)}
            {/* // {console.log(useOutlet()? "outlet true " : "outlet false")} */}
            {/* {loggedIn ? <Outlet /> : <Navigate to="/login"/> } */}

            {/* {authedUser.username ? <Outlet /> : () => setTimeout(() => { nav("/login") }, 1000)} */}
            {/* {authedUser.username ? <Outlet /> : null} */}
            {/* {authedUser.username ? <Outlet /> : <Navigate to="/" />} */}
            {authedUser.username ? <Outlet /> : nav("/")}
        </>

    )
};

export default ProtectedRoutes
