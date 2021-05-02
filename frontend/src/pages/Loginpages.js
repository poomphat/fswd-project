import "./Loginpages.css"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSession } from "../context/Sessioncontext"
import { gql, useMutation } from "@apollo/client"
import { notification } from "antd"

const failedNotification = {
    message: "Login fail",
    description: "please check your username and password",
    duration: 2.5,
}
function Loginpages() {
    const history = useHistory()
    const { login } = useSession()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = useCallback((e) => {
        console.log(e)
        setUsername(e.target.value)
    }, [])
    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value)
    }, [])
    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault()
            try {
                await login(username, password)
                history.push("/")
            } catch (error) {
                console.log(error)
                notification.error(failedNotification)
            }
        },
        [login, password, username]
    )
    const redirectToRegister = useCallback(() => {
        history.push("/register")
    }, [history])

    return (
        <>
            <div className="loginpages row">
                <div className="boxlogin" data-aos="zoom-out">
                    <h3 className="loginheader col-12">LOGIN</h3>
                    <div className="inputbox col-12">
                        <input
                            type="text"
                            class="form-control mt-2 col input"
                            placeholder="Username"
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="password"
                            class="form-control mt-2 col input"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <h6 className="text-secondary mt-4 ml-3">
                        Forgot password?
                    </h6>
                    <div className="buttonbox col-12">
                        <button
                            class="btn btn-dark col-12 buttonlog"
                            type="button"
                            onClick={redirectToRegister}
                        >
                            Register
                        </button>
                        <button
                            class="btn btn-light col-12 mt-2 buttonlog"
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginpages
