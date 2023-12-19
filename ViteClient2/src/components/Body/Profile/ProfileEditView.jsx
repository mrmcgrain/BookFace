
const ProfileEditView = ({ profile, setUpdateProfile, handleSubmitProfile }) => {
    return (
        
        <div id='ProfileEditView'>
        {console.log("PrViEDIT hit")}
            <div id="profileBody">


                <div id="topContainer" >
                    {profile.data.profileImg ? (

                        <div id="profileImg"
                            style={{ backgroundImage: `url(${"http://localhost:8080" + profile.data.profileImg})` }}>
                        </div>
                    ) : (
                            <div className="profileImg" style={{ backgroundImage: `url(${"http://localhost:8080/public/defaultImg.png"})` }}>
                            </div>)}




                    <div id="profileBio">

                        <textarea className="textarea"
                            style={{ height: "150px", width: "100%" }}  
                            // value={updateProfile.bio || ""}
                            defaultValue={profile.data ? profile.data.bio : ""}

                            name="bio"
                            placeholder="bio"
                            onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        >
                        </textarea>

                    </div>


                </div>

                {/* <div id="profileBody"> */}

                <section id="profileInfo">
                    <table>




                        <tbody>
                            {/* {filteredView(profile.data)} */}


                            {/* {profile.data.firstName ? ( */}
                                <tr>
                                    <th>First Name</th>
                                    <td>
                                        <input
                                            // value={updateProfile.firstName || ""}
                                            defaultValue={profile.data.firstName || ""}

                                            name="firstName"
                                            placeholder="firstName"
                                            onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                        >
                                        </input>
                                    </td>

                                </tr>

                            {/* ) : (null)} */}

                            {/* <br /> */}
                            {/* {profile.data.lastName ? ( */}

                                <tr>
                                    <th>Last Name</th>
                                    <td><input
                                        // value={updateProfile.lastName || ""}
                                        defaultValue={profile.data.lastName}

                                        name="lastName"
                                        placeholder="lastName"
                                        onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    >
                                    </input></td>
                                </tr>

                            {/* ) : null} */}



                            {/* {profile.data.age ? ( */}
                            <tr>
                                <th>Age</th>
                                <td>
                                    <input
                                        // value={updateProfile.age || ""}
                                        defaultValue={profile.data.age}

                                        name="age"
                                        placeholder="age"
                                        onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    >
                                    </input>

                                </td>
                            </tr>

                            {/* ) : (null)} */}

                            {/* <br /> */}
                            {/* {profile.data.birthday ? ( */}
                            <tr>
                                <th>Birthday</th>
                                <td>
                                    <input
                                        // value={updateProfile.birthday || ""}
                                        defaultValue={profile.data.birthday}

                                        name="birthday"
                                        placeholder="birthday"
                                        onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    >
                                    </input>                                </td>
                            </tr>

                            {/* ) : (null)} */}
                            {/* <br /> */}

                            {/* {profile.data.pronoun ? ( */}
                            <tr>
                                <th>Pronoun</th>
                                <td>
                                    <input
                                        // value={updateProfile.pronoun || ""}
                                        defaultValue={profile.data.pronoun}
                                        name="pronoun"
                                        placeholder="pronoun"
                                        onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    >
                                    </input>                                </td>
                            </tr>

                            {/* ) : (null)} */}

                            {/* <br /> */}

                            {/* {profile.data.profession ? ( */}
                                <tr>
                                    <th>Profession</th>
                                    <td>
                                        <input
                                            // value={updateProfile.profession || ""}
                                            defaultValue={profile.data.profession}

                                            name="profession"
                                            placeholder="profession"
                                            onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                        >
                                        </input>                                    </td>
                                </tr>
                            {/* ) : null} */}

                            {/* <br /> */}

                            {/* {profile.data.hobbies.length ? ( */}
                                <tr>
                                    <th>Interests </th>
                                    <td>
                                        <input

                                            defaultValue={profile.data.hobbies}

                                            name="hobbies"
                                            placeholder="hobbies"
                                            onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                        >
                                        </input> </td>
                                </tr>
                            {/* ) : (null)} */}

                            {/* <br /> */}

                            {/* {profile.data.favoriteMusic ? ( */}
                                <tr>
                                    <th>Favorite Music: </th>
                                    <td>

                                        <input
                                            // value={updateProfile.favoriteMusic || ""}
                                            defaultValue={profile.data.favoriteMusic}

                                            name="favoriteMusic"
                                            placeholder="favoriteMusic"
                                            // placeholder={`favoriteMusic${}`}
                                            onChange={(e) => setUpdateProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                        >
                                        </input>
                                    </td>
                                </tr>
                            {/* ) : null} */}
                        </tbody>
                    </table>


                </section>

                <div>
                    <button 
                    onClick={(e) => handleSubmitProfile(e)}>sumbit</button>
                </div>

            </div>
        </div>
    )
};

export default ProfileEditView
