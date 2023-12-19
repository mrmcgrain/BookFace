
import { useData } from "../../../hooks/context-hook"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'


// fa6 FaPhotoFilm
// import {FaPhotoFilm} from 'react-icons/fa6'


const ViewProfileInfo = () => {
    // const ViewProfileInfo = ({ viewProfile, id, handleAddFriend, handleAddFollow, handleRenderSection, renderSection }) => {

    const { authedUser, handleUpdateProfile } = useData()

    const [action, setAction] = useState()



    const handleUpdateStatus = (e, input) => {

        e.preventDefault()

        if (action === 'friend') {
            console.log("adding friend", action)
            // const handleAddFriend = (e) => {

            axios({
                method: "POST",
                url: "http://localhost:8080/api/users/addFriend",
                withCredentials: true,
                data: {
                    userId: id,

                }
            })
                .then(res => {
                    console.log("Friend Added " + id, "res", res)
                }
                    )
                .catch(err => console.log("Error adding friend", err))

            // socket.emit("addFriend", "addFriend")

            // ATTEMPT to only render pages of users affected.... above pay grade
            // socket.emit("addFriend", [authedUser._id, id])

            // }
        }

        // if (action === 'unFriend') {
        //     console.log("remove friend", e.target.id, input)

        //     axios({
        //         method: "delete",
        //         url: "http://localhost:8080/api/users/removeFriend/" + id,
        //         // data: id
        //         withCredentials: true
        //     })
        //         .then(removed => {
        //             console.log('removed', removed)
        //         })
        //         .catch(err => console.log("err", err))
        //     // axios to unfriend

        // }

        if (action === 'follow') {

            // const handleAddFollow = (e) => {
                console.log("add follow id", e.target.id)

                axios({
                    method: "PUT",
                    url: "http://localhost:8080/api/addFollow",
                    withCredentials: true,
                    data: { user: id }
                })
                    .then(res => {
                        console.log("res", res)
                        handleUpdateProfile(res.data)
                    })
                    .catch(err => console.log(err))

            // }
        }
        if (action === 'unfollow') {
            console.log("unFollow HIT", id)
            // const handleRemoveFollow = (e) => {
            //     console.log("add follow id", e.target.id)

            axios({
                method: "delete",
                url: "http://localhost:8080/api/removeFollow/" + id,
                withCredentials: true,
                // data: { user: e.target.id }
            })
                .then(res => {
                    console.log("res", res)
                })
                .catch(err => console.log("err", err))

            // }


            // "/api/removeFollow/:id
        }

        // if (action === 'unFriend') {
        //     console.log("remove friend", req.target.id)
        // }


    }

    const { profile, viewProfile } = useData()

    const { id } = useParams()

    return (
        <div id='ProfileInfo'>
            {console.log("VIEW PROFILE", viewProfile)}
            {console.log("PROFILE", profile)}
            {console.log("action", action, "params", id)}
            <div id="profileBody">


                <div id="topContainer" >
                    {Object.keys(viewProfile).length && viewProfile.profileImg ? (

                        <div id="profileImg"
                            style={{ backgroundImage: `url(${"http://localhost:8080" + viewProfile.profileImg})` }}>
                        </div>
                    ) : (
                            <div id="profileImg" className="profileImg" style={{ backgroundImage: `url(${"http://localhost:8080/public/defaultImg.png"})` }}>
                            </div>)}

                    {/* <div> */}

                    <div
                        id="viewProfileActionsContainer"
                    // style={{ width: "200px", height: "20px", display: "flex" }}
                    >
                        <div id="viewProfileActionsFollow">

                            <select style={{ height: '40px', textAlign: 'center' }} onChange={(e) => setAction(e.target.value)}>
                                <option selected disabled >Actions</option>

                                {profile ?.data ?.following.includes(id) ? (

                                    <option id={id}  value="unfollow">un follow</option>
                                )
                                    :
                                    (
                                        <option id={id} value="follow">follow</option>
                                    )}

                                {profile ?.data ?.friends.some((item) => item.userId === id && item.friend == 'approved')
                                    ?
                                    (
                                        <option id={id} value="friend">un Friend</option>

                                    )
                                    :
                                    (
                                        <option value="friend">friend</option>

                                    )
                   }
                            </select>

                            <div
                                onClick={(e) => handleUpdateStatus(e)}
                                style={{ backgroundColor: '#646cff', color: 'white', borderRadius: '25px', display: 'flex', alignItems: "center" }}>GO</div>

                        </div>



                        <br />
                        <div id="viewProfileActions">

                            <div>
                                {/* <button> Chat   </button> */}
                                <Link style={{ textDecoration: "none" }} style={{ fontSize: "20px" }} className="fab fa-rocketchat" to={"/messages/" + viewProfile._id + "/" + viewProfile.username} >  </Link>

                            </div>
                            <div>
                                <Link style={{ textDecoration: "none" }} style={{ fontSize: "20px" }}
                                    // className="fab fa-rocketchat"
                                    to={"/users/profile/" + viewProfile._id + "/gallery"} > Photos </Link>
                                {/* // onClick={(e) => handleRenderSection('photo')} */}



                            </div>
                            <div>
                                activity                               {/* <button> Activity</button> */}
                            </div>

                        </div>
                        <br />

                    </div>

                </div>

                <div id="profileAddress">
                    {Object.keys(viewProfile).length && viewProfile.location ? (
                        <section className="flex profileAddress  " >

                            <div >
                                {viewProfile.location.city}
                            </div>
                            <div>
                                {viewProfile.location.state},
                            </div>
                            <div>
                                {viewProfile.location.zipcode}
                            </div>

                        </section>
                    ) : (null)}
                    {/* city state zip --far right status */}
                </div>

                <div id="profileBio">

                    {Object.keys(viewProfile).length && viewProfile.bio ? (<p> {viewProfile.bio}</p>) : (<p>update your bio</p>)}

                </div>



                {/* <div id="profileBody"> */}

                <section id="profileInfo">
                    <table>




                        <tbody>
                            {/* {filteredView(profile.data)} */}


                            {Object.keys(viewProfile).length && viewProfile.firstName ? (
                                <tr>
                                    <th>First Name</th>
                                    <td>{viewProfile.firstName}</td>

                                </tr>

                            ) : (null)}

                            {/* <br /> */}
                            {Object.keys(viewProfile).length && viewProfile.lastName ? (

                                <tr>
                                    <th>Last Name</th>
                                    <td>{viewProfile.lastName}</td>
                                </tr>

                            ) : null}


                            {/* {Object.keys(profile.location) ?
    {profile.location ?
        (
            <tr>
                <th>Location</th>
                <td>{`${profile.location.city}, ${profile.location.state}  `}</td>
            </tr>

        )
        :
        (null)
    }

    {/* {Object.keys(profile.location) ? */}

                            {/* <br /> */}

                            {/* {Object.keys(profile).length  && profile.location ?
                                (<tr>
                                    <th>ZipCode</th>
                                    <td>{`${profile.location.zipcode}`}</td>
                                </tr>

                                )
                                :
                                (null)} */}
                            {/* <br /> */}

                            {Object.keys(viewProfile).length && viewProfile.age ? (<tr>
                                <th>Age</th>
                                <td>{viewProfile.age}</td>
                            </tr>

                            ) : (null)}

                            {/* <br /> */}
                            {Object.keys(viewProfile).length && viewProfile.birthday ? (<tr>
                                <th>Birthday</th>
                                <td>{viewProfile.birthday}</td>
                            </tr>

                            ) : (null)}
                            {/* <br /> */}

                            {Object.keys(viewProfile).length && viewProfile.pronoun ? (<tr>
                                <th>Pronoun</th>
                                <td>{viewProfile.pronoun}</td>
                            </tr>

                            ) : (null)}

                            {/* <br /> */}

                            {Object.keys(viewProfile).length && viewProfile.profession ? (
                                <tr>
                                    <th>Profession</th>
                                    <td> {viewProfile.profession}</td>
                                </tr>
                            ) : null}

                            {/* <br /> */}

                            {Object.keys(viewProfile).length && viewProfile.hobbies.length ? (
                                <tr>
                                    <th>Interests </th>
                                    <td> {viewProfile.hobbies.map((item, i) => <p key={i}>{item}</p>)} </td>
                                </tr>
                            ) : (null)}

                            {/* <br /> */}

                            {Object.keys(viewProfile).length && viewProfile.favoriteMusic ? (
                                <tr>
                                    <th>Favorite Music: </th>
                                    <td>{viewProfile.favoriteMusic}</td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                    {/* <p>Age:</p>
                    <p>pronoun</p>
                    <p>Bio</p>
                    <p>City</p>
                    <p>State</p>
                    <p>Zip</p>
                    <p>Favorite Music</p>
                    <p>Profession</p>
                    <p>interests and hobbies</p>
                    <p></p>
                    <p>Age:</p>
                    <p>State</p>
                    <p>Zip</p>
                    <p>Favorite Music</p>
                    <p>Profession</p>
                    <p>interests and hobbies</p>
                    <p></p>
                    <p>Age:</p>
                    <p>pronoun</p>
                    <p>pronoun</p>
                    <p>Bio</p>
                    <p>City</p>
                    <p>State</p>
                    <p>Zip</p>
                    <p>Favorite Music</p>
                    <p>Profession</p>
                    <p>interests and hobbies</p>
                    <p></p> */}

                </section>


                {/* <div><p>UserName</p></div> */}


            </div>


        </div >
    )
};

export default ViewProfileInfo
