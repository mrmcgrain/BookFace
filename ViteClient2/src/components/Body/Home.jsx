import Login from "../Auth/Login"
// import Register from "../comps/Register"
import { Link, } from 'react-router-dom'

const Home = () => {
    return (
        <section id='Home' className="flex center">
            {console.log("Home Render")}

            <Login />
            {/* <Register />     */}
        </section>
    )
};

export default Home
