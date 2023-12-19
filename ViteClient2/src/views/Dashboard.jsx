import { useData } from "../hooks/context-hook"
import React, { useState, useEffect, useMemo } from 'react'
// import Login from "../comps/Login"
// import Register from "../comps/Register"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import axios from 'axios'
// import Home from "../comps/Home"
import phoneimg from "../assets/phoneimg.png"

const Dashboard = () => {

    const { authedUser, handleSetAuthedUser, handleForceUpdate, update } = useData()
    const [data, setData] = useState()

    // const memoId = useMemo(() => authedUser._id, [authedUser._id])

    // const { id } = useParams

    // useEffect(() => {
    //     console.log("DB useeffect hit")
    //     axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "http://localhost:8080/user/auth"
    //     })
    //         .then(authed => {
    //             // console.log("useEff authed", authed.data)
    //             handleSetAuthedUser(authed.data)
    //             // handleSetAuthedUser(authed.data.user)

    //         })
    //         .catch(err => (console.log("DashBoard error", err)))




    // // }, [memoId])
    // }, [])

    //     useEffect(() => {

    // // console.log("dashboard ForceUpdate")

    //     },[update])


    return (
        <div id='Dashboard'

        >
            {console.log("DashBoard Render")}

            <div 
            // className="flex-center"0
            id="HeaderContainer" 
            style={{ height: "10%" }}
            // style={{ height: "5vh" }}

            >
                <Header />

            </div>


            <div 
            className="border"
                id="BodyContainer"
                // style={{ height: "640px" }}
                style={{ height: "555px" }}
                // style={{ height: "90%" }}
            // style={{borderTop: "5%"}}

            >
                <Body />

            </div>


            {/* <div id="FooterContainer"
                style={{ height: "20px" }}
                className="border flex  Footer flex-bottom">

                <Footer />

            </div> */}




        </div>
    )
};

export default Dashboard
