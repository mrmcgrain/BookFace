import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import locs from "../../util/locationJSON.json"
const Register = () => {

    const [register, setRegister] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        location: {
            city: "",
            state: "",
            zipcode: ""
        },
        secretQuestion: "",
        secretAnswer: "",
        age: "",
        gender: "",
    })

    // const fields = [ username, password, confirmPassword, age, secretQuestion, secretAnswer, ]


    const [error, setError] = useState(null)
    const [message, setMessage] = useState({})

    const nav = useNavigate()

    const validUserName = (input) => {
        console.log("validuser ?", input)

        axios({
            method: 'POST',
            url: "http://localhost:8080/user/register/verify",
            data: register
        })
            .then(res => {
                // console.log("res", res)
                setMessage(res.data.message)
            })
            .catch(err => console.log("err", err))

        if (message === "valid username") {
            return true

        } else {
            return false
        }

    }

    const validPassword = (input) => {
        if (input.length > 2 && input.length < 20) {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            // data: { username: register.username, password: register.password },
            data: register,
            url: "http://localhost:8080/user/register"
        })
            .then(res => {
                console.log("register-res", res)
                if (res.data.message === "Success") {
                    nav("/login")
                } else {
                    setRegister({ ...register, password: "" })
                    setError(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    /////////////////////////////////////////////
    const [state, setState] = useState()
    let states = Object.keys(locs).sort()

    let stateList = states.map((item, i) => {
        return (
            <option value={item}></option>
        )
    })

    let cities = locs[state]


    const handleSelect = (e) => {

        setState(e.target.value)
        setRegister(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))

    }
    //////////////////////////////////////////

    return (

        <div id='Register' className="flex center flex-col">
            <p> Register </p>
            {/* {console.log("validFormData", validPassword, validUserName)} */}
            {/* {console.log("register", register)} */}
            {console.log("Register Render", register, state, cities)}

            {error ? <span>{error}</span> : null} <br />
            {/* <div className="flex center flex-col"
            style={{justifyContent: "space-evenly"}}
            > */}
            <div>

                <input
                    type="text"
                    placeholder="UserName"
                    required
                    name="username"
                    style={{ border: validUserName(register.username) || register.username === "" ? null : "red solid 1px" }}

                    value={register.username}
                    onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />

            </div>
            <div>

                <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    required
                    style={{ border: validPassword(register.password) || register.password === "" ? null : "red solid 1px" }}
                    value={register.password}
                    onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />
            </div>
            <div>

                <input
                    type="text"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required
                    style={{ border: register.confirmPassword === register.password || register.password === "" ? null : "red solid 1px" }}
                    value={register.confirmPassword}
                    onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />
            </div>
            {/* <div>

                <input
                    type="text"
                    placeholder="Female or Male"
                    name="gender"
                    required
                    value={register.gender || ""}
                    onChange={(e) => setRegister(prev => ({ ...prev, ...prev, [e.target.name]: e.target.value }))} />

            </div> */}
            <div>
                <fieldset>


                    <select
                    style={{width: '200px'}}

                        required
                        // value={register.gender || ""}
                        onChange={(e) => setRegister(prev => ({ ...prev, ...prev, [e.target.name]: e.target.value }))}
                        name="gender"
                    >
                        <option value="sex" disabled selected>Gender</option>
                        <option value="female" >Female</option>
                        <option value="male" >Male</option>
                        <option value="other" >Other</option>
                    </select>
                </fieldset>
            </div>



            <div>

                <input
                    type="text"
                    placeholder="Age"
                    name="age"
                    required
                    value={register.age || ""}
                    onChange={(e) => setRegister(prev => ({ ...prev, ...prev, [e.target.name]: e.target.value }))} />

            </div>
            {/* <div>

                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    required
                    value={register.location.city || ""}
                    onChange={(e) => setRegister(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} />

            </div> */}



            {/* <div>

                <input onChange={(e) => handleSelect(e)}
                    value={register.location.state || ""}
                    placeholder="State"
                    list="states"
                    id="myStates"
                    name="state"
                    required
                />

                <datalist id="states">
                    {stateList}
                </datalist>

            </div> */}


            <div>
                <select onChange={(e) => handleSelect(e)}
                    value={register.location.state || ""}
                    placeholder="State"
                    list="states"
                    id="myStates"
                    style={{width: '200px'}}

                    name="state"
                    required
                >

                    {/* <datalist id="states"> */}
                    {/* {stateList} */}
                    {/* </datalist> */}

                    {states.map((item, i) => {
                        return (
                            <option
                                // style={{ color: "black", backgroundColor: "red"}}    
                                value={item}>
                                {item}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div>

                {/* <input */}
                <select
                    list="cities"
                    placeholder="City"
                    id="myCities"
                    name="city"
                    type="text"
                    required
                    style={{width: '200px'}}
                    value={register.location.city || ""}
                    onChange={(e) => setRegister(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))}
                // />
                >


                {/* <datalist id="cities"> */}
                    {/* {state ? (cityList) : null} */}
                    {cities && cities.length ? (
                        cities.sort().map((item, i) => {
                            return (
                                <option value={item}>
                                    {item}</option>

)
})
) : (null)}
                {/* </datalist> */}
</select>

            </div>








            {/* 
            <div>

                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    required
                    value={register.location.state || ""}
                    onChange={(e) => setRegister(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} />

            </div> */}









            <div>

                <input
                    type="text"
                    placeholder="ZipCode"
                    name="zipcode"
                    required
                    value={register.location.zipcode || ""}
                    onChange={(e) => setRegister(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} />

            </div>
            <div>

                <input
                    type="text"
                    placeholder="Secret Question"
                    name="secretQuestion"
                    required
                    value={register.secretQuestion || ""}
                    onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />
            </div>
            <div>

                <input
                    type="text"
                    placeholder="Secret Answer"
                    name="secretAnswer"
                    required
                    value={register.secretAnswer || ""}
                    onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />
            </div>




            <div>

                <br />
                <button
                    disabled={validUserName(register.username) && register.location.city && register.location.state && register.location.zipcode && validPassword(register.password) && register.password === register.confirmPassword ? false : true}
                    onClick={handleSubmit}>GO</button>

            </div>
        </div>

        // </div>
    )
};

export default Register
