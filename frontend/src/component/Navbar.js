import "./Navbar.css"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { ME_QUERY } from "../graphql/meQuery"
import { useSession } from "../context/Sessioncontext"
import { useHistory } from "react-router-dom"
import { useCallback } from "react"
import Navbar from "react-bootstrap/Navbar"
function NavbarStepie() {
    const history = useHistory()
    const { loading, user, logout: handleLogout } = useSession()
    const goToOrder = useCallback(() => {
        history.push("/customer/order")
    }, [history])
    const Loginout = () => {
        if (user) {
            return (
                <>
                    <li class="nav-item mt-1">
                        <button
                            class="btn btn-light ml-2"
                            type="button"
                            id="button-addon2"
                            onClick={() => goToOrder()}
                        >
                            <a className="loginbutton"> Order </a>
                        </button>
                    </li>
                    <li class="nav-item mt-1">
                        <button
                            class="btn btn-danger ml-2"
                            type="button"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </li>
                </>
            )
        } else {
            return (
                <Link to="/login">
                    <button
                        class="btn btn-light ml-2 mt-1"
                        type="button"
                        id="button-addon2"
                    >
                        <a className="loginbutton">Login</a>
                    </button>
                </Link>
            )
        }
    }
    return (
        <>
            <Navbar bg="" expand="lg" className="container">
                <Link to="/">
                    <Navbar.Brand href="#home" className="Navmain text-dark">
                        Stepie
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link to="/product">
                                <a class="nav-link Navchild">product</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/promotion">
                                <a class="nav-link Navchild">Promotion</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            {user?.role === "Admin" ? (
                                <>
                                    <Link to="/admin/dashboard">
                                        <a class="nav-link Navchild">
                                            To Dashboard
                                        </a>
                                    </Link>
                                </>
                            ) : (
                                <></>
                            )}
                        </li>
                    </ul>
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <Link to="/aboutme">
                                <a class="nav-link Navchild text-dark">
                                    {user?.name}
                                </a>
                            </Link>
                        </li>
                        <li class="nav-item mt-1">
                            <Link to="/cart">
                                <button
                                    class="btn btn-light ml-2"
                                    type="button"
                                    id="button-addon2"
                                >
                                    <a className="loginbutton">CART </a>
                                </button>
                            </Link>
                        </li>
                        <Loginout />
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavbarStepie
