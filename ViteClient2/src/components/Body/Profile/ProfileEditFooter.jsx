import { Link, useParams } from "react-router-dom"
import { useData } from "../../../hooks/context-hook"


const ProfileEditFooter = ({ handleRenderSection, renderSection }) => {

    const { id } = useParams()

    const { authedUser } = useData()



    return (
        <div id='ProfileFooter'>
            {console.log("params id: ", id, "authed", authedUser._id)}
            <section id="profileActions">




                <div onClick={(e) => handleRenderSection("profile")}>
                    Profile
</div>
                <div onClick={(e) => handleRenderSection("userInfo")}>
                    User Info
</div>
                <div onClick={(e) => handleRenderSection("profileImg")}>
                    Profile Image
</div>
                <div onClick={(e) => handleRenderSection("gallery")}>
                    Gallery
</div>

                {/* USER - render "Edit" "password", location */}


                {/* <div onClick={(e) => renderSection === "photo" ? handleRenderSection("info") : handleRenderSection("photo")}>
                    <p>
                        {renderSection === "photo" ? "info" : " photo"}
                    </p>

                </div> */}

                {/* <div onClick={(e) => renderSection === "activity" ? handleRenderSection("info") : handleRenderSection("activity")}>
                    <p>
                        {renderSection === "activity" ? "info" : " activity"}
                    </p>

                </div> */}
            </section>

        </div>
    )
};

export default ProfileEditFooter
