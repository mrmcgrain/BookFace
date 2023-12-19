import { useNavigate, Link } from "react-router-dom"

const LoginView = ({ setLogin, handleLogin, error, login }) => {


    return (
        <div id='LoginView' className="flex flex-center">



            <div className="flex flex-col">

                <section
                    className="flex center"
                    style={{ border: "dotted black 1px", height: "150px", width: "200px", color: "black" }}>
                    <p>
                        LOGO HERE
                    </p>
                </section>
                {console.log("Login Render")}
                <br />
                {error ? <span>Invalid Login Attempt!</span> : null} <br />

                <br />
                <br />
                <br />
                {/* <br /> */}
                <div>

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={login.username || ""}
                        onChange={e => setLogin({ ...login, [e.target.name]: e.target.value })} />

                </div>
                <br />
                <div>

                    <input
                        type="text"
                        placeholder="password"
                        name="password"
                        value={login.password || ""}
                        onChange={e => setLogin({ ...login, [e.target.name]: e.target.value })} />

                </div>
                <div className="flex center flex-center"
                >
                    <Link
                        to="/forgotPass"
                        id="forgotPass"

                    >forgot password?
                     </Link>
                </div>
                {/* <br />
                <br />
                <br /> */}
                <br />  <br />
                <div className="flex center flex-center">
                    <button className="flex center flex-center" onClick={(e) => handleLogin(e, login)}>Login</button>
                    {/* <button className="flex center flex-center"   onClick={(e) => handleLogin(e, loginJWT)}>JWT</button> */}

                </div>



                <br />
                <div className="flex center">
                    <br />  <br />
                    <br />
                    <Link
                        to="/register"
                        id="register"
                    >   Not a member? SignUp
                     </Link>
                </div>

                {/* <div className="flex center">
                    <Link to={`/sockettest`}>Test Secure Link</Link>
                </div> */}

            </div>

        </div>
    )
};

export default LoginView
