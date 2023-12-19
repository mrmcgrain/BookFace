import {Link, useParams} from 'react-router-dom'


const ViewProfileActions = ( { profile,handleAddFriend, handleAddFollow, handleRenderSection, renderSection , viewProfile}) => {

    const { id } = useParams()



    return (
        <div id='ViewProfileActions'>
            {/* <p> ViewProfileActions </p> */}
            <section id="profileActions" >
                {/* <div></div> */}


                {/* VISTOR...RENDER THIS */}
                {/* <div> */}


                <div>

                    {/*  FIX THIS!!!! make accept, pending unfriend... etc!!1 */}


                    {profile.data && profile.data.friends.some((obj) => obj.userId === id)
                        ?
                        (
                            <p onClick={(e) => handleAddFriend(e)}>un-friend</p>
                        )
                        :
                        (
                            <p onClick={(e) => handleAddFriend(e)}>friend</p>
                        )}

                </div>

                <div>
                    {/* <Link to=`/messaging/${id}` */}
                    {/* <i style={{ fontSize: "20px" }} className="fab fa-rocketchat" 
                    
                    onClick={(e) => handleRenderSection("chat")}
                    
                    ></i> */}

                    <Link style={{ textDecoration: "none" }} style={{ fontSize: "20px" }} className="fab fa-rocketchat" to={"/messages/" + viewProfile._id + "/" + viewProfile.username} >  </Link>
                </div>

                <div
                    id={id}
                    onClick={(e) => handleAddFollow(e)}>
                    follow
                    </div>
                {/* </div> */}

                {/* USER - render "Edit" "password", location */}


                <div
                    style={{ alignItems: "center" }}
                    onClick={(e) => renderSection === "photo" ? handleRenderSection("info") : handleRenderSection("photo")}>
                    <p>
                        {renderSection === "photo" ? "info" : " photo"}
                    </p>

                </div>

                <div onClick={(e) => renderSection === "activity" ? handleRenderSection("info") : handleRenderSection("activity")}>
                    <p>
                        {renderSection === "activity" ? "info" : " activity"}
                    </p>

                </div>
            </section>
        </div>
    )
};

export default ViewProfileActions
