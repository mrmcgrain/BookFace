import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const ForgotPasssword = () => {

    const [secretAnswer, setSecretAnswer] = useState({

        secretAnswer: ""
    })

    const [error, setError] = useState(null)
    const [message, setMessage] = useState({})

    const nav = useNavigate()

    // const validUserName = (input) => {
    //     console.log("validuser ?", input)

    //     axios({
    //         method: 'POST',
    //         url: "http://localhost:8080/user/register/verify",
    //         data: register
    //     })
    //         .then(res => {
    //             // console.log("res", res)
    //             setMessage(res.data.message)
    //         })
    //         .catch(err => console.log("err", err))

    //     if (message === "valid username") {
    //         return true

    //     } else {
    //         return false
    //     }

    // }

    // const validPassword = (input) => {
    //     if (input.length > 2 && input.length < 20) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios({
    //         method: 'POST',
    //         // data: { username: register.username, password: register.password },
    //         data: register,
    //         url: "http://localhost:8080/user/register"
    //     })
    //         .then(res => {
    //             console.log("register-res", res)
    //             if (res.data.message === "Success") {
    //                 nav("/login")
    //             } else {
    //                 setRegister({ ...register, password: "" })
    //                 setError(res.data.Error)
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }


    return (

        <div id='Register' className="flex center flex-col">
            <p> Forgot Pass </p>
            {/* {console.log("validFormData", validPassword, validUserName)} */}
            {/* {console.log("register", register)} */}
            {console.log("Register Render")}

            {error ? <span>{error}</span> : null} <br />
            <div className="flex center flex-col">
                <div>

                    {/* <input
                        type="text"
                        placeholder="UserName"
                        required
                        name="username"
                        style={{ width: '200px', border: validUserName(register.username) || register.username === "" ? null : "red solid 1px" }}

                        value={register.username}
                        onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} /> */}

                </div>
                <br />
                <div>
{/* 
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        required
                        style={{ width: '200px', border: validPassword(register.password) || register.password === "" ? null : "red solid 1px" }}
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} /> */}
                </div>
                <br />
                <div>

                    {/* <input
                        type="text"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        style={{ width: '200px', border: register.confirmPassword === register.password || register.password === "" ? null : "red solid 1px" }}
                        value={register.confirmPassword}
                        onChange={(e) => setRegister({ ...register, [e.target.name]: e.target.value })} />
                </div> */}
                <div>

                    {/* <input
                        type="text"
                        placeholder="City"
                        name="city"
                        required
                        value={register.location.city || ""}
                        onChange={(e) => setRegister(prev => ({ ...prev, location: { ...prev.location, [e.target.name]: e.target.value } }))} /> */}

                </div>
              



                <div>

                    <br />
                    {/* /<button
                        disabled={validUserName(register.username) && register.location.city && register.location.state && register.location.zipcode && validPassword(register.password) && register.password === register.confirmPassword ? false : true}
                        onClick={handleSubmit}>Register</button> */}

                </div>
            </div>

        </div>
        </div>
    )
};

export default ForgotPasssword
