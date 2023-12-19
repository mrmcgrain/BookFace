import React, { useState } from 'react'
import axios from 'axios'

const EditUserInfo = () => {

    const [password, setPassword] = useState({
        password: "",
        confirmPassword: ""
    })


    const handleUpdatePassword = (e) => {
        setPassword(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const SubmitPassword = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: "http://localhost:8080/user/updatePassword",
            data: password,
            withCredentials: true,
        })
            .then(updated => console.log("updated", updated))
            .catch(err => console.log("err", err))
    }


    const validPassword = (input) => {
        if (input.length > 2 && input.length < 20) {
            return true
        } else {
            return false
        }
    }



    const [address, setAddress] = useState({
        location : {
            city: "",
            state: "",
            zipcode: ""
        }
    })


    const handleUpdateAddress = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: "http://localhost:8080/user/updateAddress",
            data: address,
            withCredentials: true,
        })
            .then(updated => console.log("updated", updated))
            .catch(err => console.log("err", err))
    }


    return (
        <div id='EditUserInfo'>
            {console.log("EditUseerInfo Render")}

            {/* {console.log("passwordf", password)} */}
            {/* {console.log("address", address)} */}
            {/* <p> EditUserInfo  test</p> */}

            <div id="profileBody"> 
                           <p> Update Address and Password </p>
                <div>

                    <form>
                        <input
                            onChange={(e) => handleUpdatePassword(e)}
                            value={password.password || ""}
                            placeholder="password"
                            name="password"
                            type="passwword"
                        />
                        <br />
                        <br />
                        <input
                            onChange={(e) => handleUpdatePassword(e)}
                            value={password.confirmPassword || ""}

                            name="confirmPassword"
                            placeholder="confirmPassword"
                            type="passwword"
                        />

<br />
<br />
                        <button
                            disabled={validPassword(password.password) && password.password === password.confirmPassword ? false : true}
                            onClick={SubmitPassword}>Update Password</button>
                    </form>
                </div>
<br />


                <div>
                    <form>

                        <div>

                            <tr>
                                {/* <th>City</th> */}
                                <td>

                                    <input
                                        // value={updateProfile.location.city || ""}
                                        // defaultValue={profile.data.location.city}

                                        name="city"
                                        placeholder="city"
                                        onChange={(e) => setAddress(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))}
                                    >
                                    </input>

                                </td>
                            </tr>

                            <tr>

                                {/* <th>State</th> */}
                                <td>
                                    <input
                                        // value={updateProfile.location.state || ""}
                                        // defaultValue={profile.data.location.state}

                                        name="state"
                                        placeholder="state"
                                        onChange={(e) => setAddress(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))}
                                    >
                                    </input>
                                </td>
                            </tr>

                            <tr>

                                {/* <th>ZipCode</th> */}
                                <td>
                                    <input
                                        // value={updateProfile.location.zipcode || ""}
                                        // defaultValue={profile.data.location.zipcode}

                                        name="zipcode"
                                        placeholder="zip"
                                        onChange={(e) => setAddress(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))}
                                    >
                                    </input>
                                </td>
                            </tr>

                        </div>
<div>

                        <button
                            disabled={address.location.city && address.location.state && address.location.zipcode ? false : true}
                            onClick={(e) => handleUpdateAddress(e)}>update</button>
                            </div>
                    </form>

                </div>



            </div>



        </div>
    )
};

export default EditUserInfo
