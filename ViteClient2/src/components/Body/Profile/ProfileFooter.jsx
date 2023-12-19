import { Link, useParams } from "react-router-dom"
import { useData } from ".././../../hooks/context-hook"


const ProfileFooter = ({ handleRenderSection, renderSection }) => {

    const { id } = useParams()

    const { authedUser } = useData()



    return (
        <div id='ProfileFooter'>
            {console.log("params id: ", id, "authed", authedUser._id)}
            <section id="profileActions" >
                {/* <div></div> */}
                {authedUser._id === id &&
                    <div className="flex" style={{ justifyContent: "space-between" }}>
                        <Link to={`/profileEdit/${id}`}>Update Profile</Link>

                    </div>}

                {/* VISTOR...RENDER THIS */}
                {authedUser._id !== id && <div>
                    <div>
                        friend
                </div>

                    <div>
                        msg
                 </div>

                    <div>
                        follow
                    </div>
                </div>}

                {/* USER - render "Edit" "password", location */}


                <div 
                style={{alignItems: "center"}}
                // onClick={(e) => renderSection === "photo" ? handleRenderSection("info") : handleRenderSection("photo")}
                >
               <Link style={{ textDecoration: "none" }} style={{ fontSize: "20px" }}  to={"/users/profile/" + authedUser._id + "/gallery"} > photos </Link>
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

export default ProfileFooter
