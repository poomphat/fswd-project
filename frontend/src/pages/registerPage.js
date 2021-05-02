import "./Loginpages.css"
import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSession } from "../context/Sessioncontext"
import { CREATE_CUSTOMER_MUTATION } from "../graphql/createCustomerMutation"
import { CREATE_CART_MUTATION } from "../graphql/createCartMutation"
import { notification } from "antd"
import { useMutation } from "@apollo/client"
const failedNotification = {
    message: "Register fail",
    description: "please check your input field",
    duration: 2.5,
}
function Register() {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION)
    const [createCart] = useMutation(CREATE_CART_MUTATION)

    const handleUsernameChange = useCallback((e) => {
        console.log(e)
        setUsername(e.target.value)
    }, [])
    const handleNameChange = useCallback((e) => {
        console.log(e)
        setName(e.target.value)
    }, [])
    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value)
    }, [])
    const handleRegister = useCallback(async (e) => {
        if (username !== "" && password !== "" && name !== "") {
            try {
                await createCustomer({
                    variables: {
                        username: username,
                        password: password,
                        name: name,
                    },
                }).then((result) => {
                    const userId = result.data.createUser.record._id
                    createCart({ variables: { userId: userId } })
                    redirectToLogin()
                })
            } catch (error) {
                console.log(error)
                notification.error(failedNotification)
            }
        } else {
            notification.error(failedNotification)
        }
    })
    const redirectToLogin = useCallback(() => {
        history.push("/login")
    }, [history])

    return (
        <>
            <div className="loginpages row">
                <div className="boxlogin" data-aos="zoom-out">
                    <h3 className="loginheader col-12">Register</h3>
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
                        <input
                            type="text"
                            class="form-control mt-2 col input"
                            placeholder="Name"
                            onChange={handleNameChange}
                        />
                    </div>
                    <br />
                    <div className="buttonbox col-12">
                        <button
                            class="btn btn-dark col-12 mt-2 buttonlog"
                            type="button"
                            onClick={handleRegister}
                        >
                            register
                        </button>
                        <button
                            class="btn btn-light col-12 buttonlog mt-2"
                            type="button"
                            onClick={redirectToLogin}
                        >
                            go to login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
