
// import { useData } from "../../../hooks/context-hook"

const ProfileInfo = ({ profile }) => {

    // const { profile } = useData()

    return (
        <div id='ProfileInfo'>
            {console.log(Object.values(profile).length)}
            <div id="profileBody">


                <div id="topContainer" >


                    {/* FUN FACT, chrome Version 77.0.3865.90 (Official Build) (64-bit) does not suppport ?. WTFFFFF  */}


                    {/* {profile?.data?.profileImg ? ( */}
                    {profile.data && profile.data.profileImg ? (

                        <div id="profileImg"
                            style={{ backgroundImage: `url(${"http://localhost:8080" + profile.data.profileImg})` }}>
                        </div>
                    ) : (
                            <div className="profileImg" style={{ backgroundImage: `url(${"http://localhost:8080/public/defaultImg.png"})` }}>
                            </div>)}




                    <div id="profileBio">

                        {profile.data && profile.data.bio ? (<p> {profile.data.bio}</p>) : (<p>update your bio</p>)}

                    </div>


                </div>

                {/* <div id="profileBody"> */}

                <section id="profileInfo">
                    <table>




                        <tbody>
                            {/* {filteredView(profile.data)} */}


                            {profile.data && profile.data.firstName ? (
                                <tr>
                                    <th>First Name</th>
                                    <td>{profile.data.firstName}</td>

                                </tr>

                            ) : (null)}

                            {/* <br /> */}
                            {profile.data && profile.data.lastName ? (

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

                            {/* <br /> */}

                            {profile.data && profile.data.location ?
                                (<tr>
                                    <th>ZipCode</th>
                                    <td>{`${profile.data.location.zipcode}`}</td>
                                </tr>

                                )
                                :
                                (null)}
                            {/* <br /> */}

                            {profile.data && profile.data.age ? (<tr>
                                <th>Age</th>
                                <td>{profile.data.age}</td>
                            </tr>

                            ) : (null)}

                            {/* <br /> */}
                            {profile.data && profile.data.birthday ? (<tr>
                                <th>Birthday</th>
                                <td>{profile.data.birthday}</td>
                            </tr>

                            ) : (null)}
                            {/* <br /> */}

                            {profile.data && profile.data.pronoun ? (<tr>
                                <th>Pronoun</th>
                                <td>{profile.data.pronoun}</td>
                            </tr>

                            ) : (null)}

                            {/* <br /> */}

                            {profile.data && profile.data.profession ? (
                                <tr>
                                    <th>Profession</th>
                                    <td> {profile.data.profession}</td>
                                </tr>
                            ) : null}

                            {/* <br /> */}

                            {profile.data && profile.data.hobbies.length ? (
                                <tr>
                                    <th>Interests </th>
                                    <td> {profile.data.hobbies.map((item, i) => <p key={i}>{item}</p>)} </td>
                                </tr>
                            ) : (null)}

                            {/* <br /> */}

                            {profile.data && profile.data.favoriteMusic ? (
                                <tr>
                                    <th>Favorite Music: </th>
                                    <td>{profile.data.favoriteMusic}</td>
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


        </div>
    )
};

export default ProfileInfo
