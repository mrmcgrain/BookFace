import { useData } from "../hooks/context-hook"
import { Outlet, useOutlet } from 'react-router-dom'
import Home from "../components/Body/Home"


const Body = () => {

    const { authedUser } = useData()
    let out = useOutlet()

    return (
        <>
            <section id='Body' 
            // style={{height: '80%'}}
            >
                {console.log("Body Render")}

                {out ? (<Outlet />) : (<Home />)}
            </section>

        </>

    )
};

export default Body
