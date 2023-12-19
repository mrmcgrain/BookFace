import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useData } from "../../../hooks/context-hook"
import { Link } from 'react-router-dom'
import Messages from './_Messages'
import truncate from "../../../util/truncate.js"

const Messaging = () => {

    const { authedUser, messages, profile } = useData()



    return (
        <div id='Messaging'

        >

            {console.log("Messaging - profile", profile)}

            <div
                style={{ width: "100%" }}
            >

                {profile.data && profile.data.messages.map((obj, i) => {
                    console.log("obj", obj)
                    return (
                        <Link key={i} to={`/messages/${obj.userId._id}/${obj.senderName}`}>

                            {/* <div key={i}
                                className="MessagingFullContainer"
                                id={obj.userId}>
                                <div>

                                    <div style={{ display: "flex" }}>
                                        <div>
                                            User
                       </div>
                                        <div>

                                            4 new
                         </div>
                                    </div>
                                </div>

                                <div>
                                    test
                  </div>
                            </div> */}



                            <div key={i}
                                // className="MessagingFullContainer"
                                id={obj.userId}

                            >
                                <div id="messageUserContainer" style={{ display: "flex", flexDirection: "row" }}
                                >

                                    <div id="messageUserImg"

                                    >
                                        <img
                                            id={obj.userId}
                                            className="messgeProfile"
                                            src={obj.userId.profileImg ? (`http://localhost:8080${obj.userId.profileImg}`) : ("http://localhost:8080/public/defaultImg.png")}
                                        >
                                        </img>
                                    </div>


                                    <div id="messageUserContainerInfo">


                                        <div className="flex" style={{ flexDirection: "column" }}>

                                            <div style={{ display: "flex", flexDirection: "row" }}>


                                                <div
                                                    style={{ border: `solid 2px red !important` }}
                                                    id="messageUserContainerUsername"
                                                >
                                                    <p
                                                        id={obj.userId}
                                                    >  {obj.senderName} :
                                        </p>
                                                    {/* 
    <div
                                                    id="messageUserContainerRecentMessage"
                                                // style={{ width: "800px" }}
                                                >
                                                    <p>{truncate(obj.recent)}</p>
                                                </div> */}
                                                </div>

                                                <div id="messageUserContainerMsgCount">
                                                    <p>
                                                        {obj.messages.length ? obj.messages.length - obj.messageCount  : null}
                                                    </p>
                                                </div>

                                                <div style={{ marginLeft: "25px"}}>
                                                    {/* online? */}
                                                    {obj.userId.isOnline && <p style={{ color: "lime" }}> online</p>}

                                                </div>
                                            </div>

                                            <div
                                                id="messageUserContainerRecentMessage"
                                            // style={{ width: "800px" }}
                                            >
                                                <p style={{textAlign: "left",marginLeft: "16px" }}>{truncate(obj.recent)}</p>
                                            </div>
                                        </div>


                                    </div>



                                </div>

                            </div>



                        </Link>

                    )

                })}
            </div >






        </div >
    )
};

export default Messaging
