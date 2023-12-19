import React, { useState } from 'react'
import AddNewFeed from './AddNewFeed'


const FeedActions = ({ handleExpandNewFeedView, handleFeedSearch, feedSearch, setFeedSearch }) => {

    // const [expandAddFeed, setExpandAddFeed] = useState(false)


    return (
        <div id='FeedActions' >

            <section id="ActionOptions" style={{ margin: "10px" }}>

                <div
                    onClick={(e) => handleExpandNewFeedView(true)}
                >
                    (add)
                </div>

                <div>
                    <input
                        value={feedSearch || ""}
                        onChange={(e) => setFeedSearch(e.target.value)}
                        placeholder="search"
                    ></input>
                </div>

                <div onClick={(e) => handleFeedSearch(e)}>(go)</div>
            </section>
            {/* <br /> */}


        </div>




    )
};

export default FeedActions
