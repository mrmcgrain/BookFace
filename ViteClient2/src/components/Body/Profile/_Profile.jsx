import { useData } from "../../../hooks/context-hook"
import React, { useEffect, useState, useLayoutEffect } from 'react'
// import ImageForm from "./ImageForm"
import axios from 'axios'
import { Link, useParams } from "react-router-dom"


const Profile = () => {

    const { id } = useParams()

    const { handleUpdateProfile, profile, handleSetMessages } = useData()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8080/profile"
        })
            .then(res => {
                // console.log("res", res)
                // setProfile(res)
                setIsLoading(true)
                handleUpdateProfile(res)
                setIsLoading(false)
            }
            )
            .catch(err => console.log("err", err))

 
    }, [])


    /////&& item[0] !== "bio" && item[0] !== "image"

    const filteredView = (input) => {
        console.log("input filted view", input)
        console.log("objEnt", Object.entries(input))
        let filt = Object.entries(input).filter((item) => item[1] != String)
        console.log(filt)
        //    .map((obj) => {
        //         return (
        //             <tr>
        //                 <th>{obj[0]}</th>
        //                 <td>{obj[1]}</td>
        //             </tr>
        //         )
        // })
    }








    ////

    return (


        <div id='Profile'
            // style={{ paddingLeft: "10px", paddingTop: "10px" }} 
            className="flex  border flex-row">
            {/* {console.log("profileState", profile)} */}
            {/* {console.log("isLoading", isLoading)} */}
            {console.log("Profile Render")}


            <div style={{ width: "60vw" }}>

                <div className="flex flex-row border">

                    <div>
                        {/* {Object.keys(profile.data) */}
                        {/* {!isLoading
                            ?
                            (
                                <div>
                                    <p>Welcome back {profile.data.username}</p>

                                </div>
                            )
                            :
                            (
                                null
                            )
                        } */}

                        <div id="profileImg">
                            {/* {Object.keys(profile.data.images.profile).length  */}
                            {profile.data.profileImg
                                ?
                                (
                                    //  null
                                    <div className="profileImage" style={{ backgroundImage: `url(${"http://localhost:8080" + profile.data.profileImg})` }}>
                                    </div>
                                )
                                :
                                (
                                    <div className="profileImage" style={{ backgroundImage: `url(${"http://localhost:8080/public/defaultImg.png"})` }}>
                                    </div>)}
                        </div>

                        <div className="flex center">
                            <Link to={`/profileEdit/${id}`}> Edit your Profile</Link>
                        </div>

                        <br />
                    </div>

                    <div id="ProfileBio" className="flex ">
                        {(!isLoading && profile.data.bio) ? (<p> {profile.data.bio}</p>) : (null)}


                    </div>

                </div>



                {/* TEST layoutEffect AREA */}
                {/* <div>
    {profile.data.firstName}
    </div> */}



                <div>
                    {/* {profile.data ? */}
                    {!isLoading ?
                        (
                            <div>

                                <p>

                                    {/* ////*/}



                                    {/*  */}
                                </p>

                                <table>




                                    <tbody>
                                        {/* {filteredView(profile.data)} */}


                                        {profile.data.firstName ? (
                                            <tr>
                                                <th>First Name</th>
                                                <td>{profile.data.firstName}</td>

                                            </tr>

                                        ) : (null)}

                                        {profile.data.lastName ? (

                                            <tr>
                                                <th>Last Name</th>
                                                <td>{profile.data.lastName}</td>
                                            </tr>

                                        ) : null}


                                        {/* {Object.keys(profile.data.location) ?
                                        {profile.data.location ?
                                            (
                                                <tr>
                                                    <th>Location</th>
                                                    <td>{`${profile.data.location.city}, ${profile.data.location.state}  `}</td>
                                                </tr>

                                            )
                                            :
                                            (null)
                                        }

                                        {/* {Object.keys(profile.data.location) ? */}
                                        {profile.data.location ?
                                            (<tr>
                                                <th>ZipCode</th>
                                                <td>{`${profile.data.location.zipcode}`}</td>
                                            </tr>

                                            )
                                            :
                                            (null)}

                                        {profile.data.age ? (<tr>
                                            <th>Age</th>
                                            <td>{profile.data.age}</td>
                                        </tr>

                                        ) : (null)}

                                        {profile.data.birthday ? (<tr>
                                            <th>Birthday</th>
                                            <td>{profile.data.birthday}</td>
                                        </tr>

                                        ) : (null)}
                                        {profile.data.pronoun ? (<tr>
                                            <th>Pronoun</th>
                                            <td>{profile.data.pronoun}</td>
                                        </tr>

                                        ) : (null)}


                                        {profile.data.profession ? (
                                            <tr>
                                                <th>Profession</th>
                                                <td> {profile.data.profession}</td>
                                            </tr>
                                        ) : null}


                                        {profile.data.hobbies.length ? (
                                            <tr>
                                                <th>Interests and Hobbies </th>
                                                <td> {profile.data.hobbies.map((item, i) => <p key={i}>{item}</p>)} </td>
                                            </tr>
                                        ) : (null)}



                                        {profile.data.favoriteMusic ? (
                                            <tr>
                                                <th>Favorite Music: </th>
                                                <td>{profile.data.favoriteMusic}</td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </table>







                            </div>
                        )
                        :
                        (
                            <div>
                                <p>Age:</p>
                                <p>pronoun</p>
                                <p>Bio</p>
                                <p>City</p>
                                <p>State</p>
                                <p>Zip</p>
                                <p>Favorite Music</p>
                                <p>Profession</p>
                                <p>interests and hobbies</p>
                                <p></p>
                            </div>
                        )}




                </div>


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>
            <br />
            {/* <ImageForm /> */}

            <div
                style={{ width: "20vw", float: "right", paddingLeft: '25px', marginBottom: "15px" }}
                className="border "
            >
                <p>Gallery</p>
                {profile.data.gallery.map((img) => {
                    return (

                        <div style={{ width: "150px", height: "150px", backgroundImage: `url(${"http://localhost:8080" + img})` }} className=" gallery border" name="gallery1"> </div>
                    )
                })}


            </div>

        </div >
    )
};

export default Profile
