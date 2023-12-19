import locs from "../../util/locationJSON.json"
import React, { useState } from 'react'

const LocationSelector = () => {

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

    }

    return (
        <div id='LocationSelector' className="flex">
            {/* {console.log("ocs", locs)} */}
            {console.log("states", state)}


            {/* <label for="myBrowser">Choose state</label> */}

            <input onChange={(e) => handleSelect(e)}
                placeholder="State"
                list="states" id="myStates" name="state" />

            <datalist id="states">
                {stateList}
            </datalist>


            {/* <label for="myCities">Choose city</label> */}

            <input list="cities" placeholder="City" id="myCities" name="city" />

            <datalist id="cities">
                {/* {state ? (cityList) : null} */}
                {cities && cities.length ? (
                    cities.sort().map((item, i) => {
                        return (
                            <option value={item}></option>

                        )
                    })
                ) : (null)}
            </datalist>


        </div>
    )
};

export default LocationSelector