
import { useData } from "../hooks/context-hook"

const Footer = () => {

    const { CheckAuthUser } = useData()

    return (
        <div id='Footer'>
            {console.log("Footer Render")}

            <p onClick={CheckAuthUser}>check auth</p>
        </div>
    )
};

export default Footer
