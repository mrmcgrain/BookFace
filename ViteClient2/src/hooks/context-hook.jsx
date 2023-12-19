import React, { createContext, useState, useContext } from "react"
import axios from 'axios'

////IMAGES 



const MyContext = createContext()

export const useData = () => useContext(MyContext)


export function MyProvider({ children }) {
    //  function MyProvider({ children }) {

    //////////

    // const [data, setData] = useState({
    // })

    /// current loggedin User
    const [authedUser, setAuthedUser] = useState({
        username: "",
        _id: ""
    })

    ///asttemt to memo-ize authed User ////

    // const memoUser = useMemo(() => authedUser, [authedUser])

    // const handleMemo = (e, input) => {
    //     // console.log("handleMemo", input)
    //     // let memoUser = useMemo(() => input._id, [input._id])
    // }



    // const [loggedIn, setLoggedIn] = useState(false)
    const FullReset = () => {
        console.log("Full reset hit")
        // setMessages([])
        setAllUsers([])
        // handleSetAllUsers()
        handleUpdateProfile()
        handleSetMessages()

    }

    //// for rightbody to show all users
    const [allUsers, setAllUsers] = useState([])
    // const [allUsers, setAllUsers] = useCallback({})
    const handleSetAllUsers = (input) => {
        // console.log("handleSetAllusers", input)
        setAllUsers(input)
    }

    //////////////////// My Profile ///////////////


    const [profile, setProfile] = useState({})
    console.warn("CONTEXT PROFILE", profile)
    const handleUpdateProfile = (input = {}) => {
        console.log("Context-handleUpdateProfile-input", input)
        setProfile(input)
    }
    /////////////////////  Messages /////////////
    const [messages, setMessages] = useState([])

    const handleSetMessages = (input = []) => {
        console.log("handleSetMessges-input", input)
        setMessages(input)
    }

    /////////////////////////////////////////////////////////////
    // const [message, setMessage] = useState("")


    // const handleSystemMessage = (e) => {
    //     setMessage(e.target.value)
    // }
    /////////////////////////////////////////////////////////////



    //// set from  login component
    const handleSetAuthedUser = (input = {}) => {
        console.log("handleSetAuthUser-input", input)

        if (!Object.keys(input).length) {
            console.log("clear auth hit")
            setAuthedUser({
                username: "",
                _id: ""
            })
        } else {
            setAuthedUser(prev => ({
                ...prev,
                username: input.username,
                _id: input._id
            }))
        }


    }

    const CheckAuthUser = (e) => {
        e.preventDefault();

        axios({
            method: "GET",
            withCredentials: true, ///ALWAYS NEEDED now that we are using cookies
            url: "http://localhost:8080/user/auth"
            // url: "http://localhost:8080/test"
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    // const [notification, setNotification] = useState(profile.data.notifications)


    /////////////////////////////////////////////////////////////
    // FORCE UPDATE //

    const [update, setUpdate] = useState(false)

    // const handleForceUpdate = () => {
    //     console.log("pre Forced Update", update)
    //     update ? setUpdate(false) : setUpdate(true)
    //     console.log("Forced Update", update)
    // }
    /////////////////////////////////////////////////////////////
    // new messages .....?
    const handleMessageCount = () => {
        // console.log("CONTEXT - msg", profile.data.messages)
        let count = 0

        if (authedUser._id) {
            if (profile.data) {
                if (profile.data.messages) {

                    profile.data.messages.forEach((obj) => count += obj.messages.length - obj.messageCount)
                    // console.log("Count", count)
                    return count
                }
            }
        }

    }

    handleMessageCount()
    /////////////////////////////////////////////////////////////

    // const [userMessage, setUserMessage] = useState({})

    // const handleSendUserMessage = (e, input) => {
    //     setUserMessage(prev => ({
    //         ...prev,
    //         message: input
    //     }))
    // }

    /////////////////////////////////////////////////////////////

    // const [nestedPath, setNestedPath] = useState([])

    // const handleNestedPath = (input) => {
    //     setNestedPath(input)
    // }

    // console.log('authedUser-Context', authedUser)

    const [viewProfile, setViewProfile] = useState({})

    const handleViewProfile = (input) => {
        console.log("handleViewProfile", input)
        setViewProfile(input)
    }

    return (

        <MyContext.Provider
            value={{
                handleSetAuthedUser,
                authedUser,
                handleSetAllUsers,
                allUsers,
                // setLoggedIn,
                // handleSendUserMessage,
                // handleMemo,
                profile,
                handleUpdateProfile,
                handleSetMessages,
                messages,
                // handleForceUpdate,
                update,
                FullReset,
                CheckAuthUser,
                // handleNestedPath,
                // nestedPath,
                handleMessageCount,
                // setNotification,
                // notification,
                handleViewProfile,
                viewProfile
            }}
        >
            {children}


        </MyContext.Provider>


    )




}

export default MyProvider