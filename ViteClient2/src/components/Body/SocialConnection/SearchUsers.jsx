

import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchFilter from "./SearchFilter"

const SearchUsers = () => {

    const [searchInfo, setSearchInfo] = useState({
        gender: "female",
        ageLow: "",
        ageHigh: ""
    })

    const [foundUsers, setFoundUsers] = useState([])

    const [filterView, setFilterView] = useState(false)
    const handleFilterView = () => {
        setFilterView(!filterView)
    }

    const handleFoundUsers = (input) => {
        setFoundUsers(input)
    }

    const handleSetSearchInfo = (e) => {
        console.log("Handle search")
        setSearchInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()


        // let gender = searchInfo.gender
        // let ageHigh = searchInfo.ageHigh
        // let ageLow = searchInfo.ageLow

        // :gender/:ageHigh/:ageLow
        axios({
            method: "POST",
            url: `http://localhost:8080/api/searchUsers/`,
            withCredentials: true,
            data: searchInfo
        })
            .then(found => {
                console.log("found", found)
                handleFoundUsers(found.data)

            })
            .catch(err => console.log("erR", err))
    }





    return (
        <div id='SearchUsers'>
            <p> Search Users  find friends... be merry</p>
            {console.log("serach users", searchInfo)}
            {console.log("foundUsers ", foundUsers)}

            <br />
            <div id="searchActions">


                <select
                    style={{ width: "100px" }}
                    name="gender"
                    onChange={(e) => handleSetSearchInfo(e)}
                    placeholder="gender"
                    defaultValue={searchInfo.gender || ""}
                >
                    {/* <option value="sex" disabled selected>Sex</option> */}
                    <option value="female" defaultValue >Female</option>
                    <option value="male" >Male</option>
                    <option value="other" >Other</option>
                </select>

                <input
                    name="ageLow"
                    onChange={(e) => handleSetSearchInfo(e)}
                    placeholder="from age"
                    value={searchInfo.ageLow || ""}
                ></input>
                <input
                    name="ageHigh"
                    onChange={(e) => handleSetSearchInfo(e)}
                    placeholder="to age"
                    value={searchInfo.ageHigh || ""}
                ></input>

                <div onClick={(e) => handleFilterView(e)}>
                    ...
    </div>
                <button onClick={(e) => handleSearchSubmit(e)}>search</button>
                {/* <input
                        name="email"
                        onChange={(e) => handleSetSearchInfo(e)}
                        placeholder="email"
                        value={searchInfo.email || ""}
                   ></input> */}
            </div>

<br />
            {filterView && <div>
                <SearchFilter />
            </div>}

            <div id="FoundUsers">

                {foundUsers.length
                    ?
                    (

                        foundUsers.map((obj, i) => {
                            // console.log("obj found user", obj)
                            return (
                                <div key={i} style={{ marginTop: "20px" }} className="flex flex-row">
                                    <br />
                                    <div style={{ marginRight: "15px" }}>

                                        <img
                                            alt="huh"
                                            id={obj.userId}
                                            className="messgeProfile"
                                            // src={`http://localhost:8080${obj.profileImg}`}>
                                            src={obj.profileImg ? `http://localhost:8080${obj.profileImg}` : "http://localhost:8080/public/defaultImg.png"}>
                                        </img>

                                    </div>

                                    <div style={{ marginLeft: "15px", width: "100px" }}>
                                        {/* <p style={{ marginTop: "4px" }}>
                                                    {obj.username}
                                                </p> */}

                                        <Link style={{ textDecoration: "none" }} key={i} to={"/users/profile/" + obj._id}> {obj.username} </Link>


                                    </div>

                                    <div style={{ marginLeft: "15px" }}>
                                        <p style={{ marginTop: "4px" }}>

                                            {obj.age}
                                        </p>

                                    </div>

                                    <div style={{ marginLeft: "85px" }}>
                                        <p style={{ marginTop: "4px" }}>

                                            {obj.location.city}

                                        </p>



                                    </div>
                                    <div style={{ marginLeft: "15px" }}>
                                        <p style={{ marginTop: "4px" }}>

                                            {obj.location.state}

                                        </p>



                                    </div>
                                </div>
                            )
                        })


                    )
                    :
                    (
                        null
                    )}



            </div>

        </div>
    )
};

export default SearchUsers


